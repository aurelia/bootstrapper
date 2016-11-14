import 'aurelia-polyfills';
import {PLATFORM} from 'aurelia-pal';
import {initialize} from 'aurelia-pal-browser';

let bootstrapQueue = [];
let sharedLoader = null;
let Aurelia = null;

function onBootstrap(callback) {
  return new Promise((resolve, reject) => {
    if (sharedLoader) {
      resolve(callback(sharedLoader));
    } else {
      bootstrapQueue.push(() => {
        try {
          resolve(callback(sharedLoader));
        } catch (e) {
          reject(e);
        }
      });
    }
  });
}

function ready() {
  return new Promise((resolve, reject) => {
    if (typeof global !== 'undefined' && global.process) { /* is NodeJS */
      return resolve(true);
    }

    if (window.document.readyState === 'complete') {
      return resolve(false);
    } else {
      window.document.addEventListener('DOMContentLoaded', completed);
      window.addEventListener('load', completed);
    }

    function completed() {
      window.document.removeEventListener('DOMContentLoaded', completed);
      window.removeEventListener('load', completed);
      resolve(false);
    }
  });
}

function createLoader() {
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

  if (window.System && typeof window.System.import === 'function') {
    return window.System.normalize('aurelia-bootstrapper').then(bootstrapperName => {
      return window.System.normalize('aurelia-loader-default', bootstrapperName);
    }).then(loaderName => {
      return window.System.import(loaderName).then(m => new m.DefaultLoader());
    });
  }

  if (typeof window.require === 'function') {
    return new Promise((resolve, reject) => window.require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
  }

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function preparePlatform(loader) {
  return loader.normalize('aurelia-bootstrapper').then(bootstrapperName => {
    return loader.normalize('aurelia-framework', bootstrapperName).then(frameworkName => {
      loader.map('aurelia-framework', frameworkName);

      return Promise.all([
        loader.normalize('aurelia-dependency-injection', frameworkName)
          .then(diName => loader.map('aurelia-dependency-injection', diName)),
        loader.normalize('aurelia-router', bootstrapperName)
          .then(routerName => loader.map('aurelia-router', routerName)),
        loader.normalize('aurelia-logging-console', bootstrapperName)
          .then(loggingConsoleName => loader.map('aurelia-logging-console', loggingConsoleName))
      ]).then(() => {
        return loader.loadModule(frameworkName).then(m => Aurelia = m.Aurelia);
      });
    });
  });
}

function handleApp(loader, appHost) {
  const moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
  return config(loader, appHost, moduleId);
}

function config(loader, appHost, configModuleId) {
  const aurelia = new Aurelia(loader);
  aurelia.host = appHost;
  aurelia.configModuleId = configModuleId || null;

  if (configModuleId) {
    return loader.loadModule(configModuleId).then(customConfig => {
      if (!customConfig.configure) {
        throw new Error("Cannot initialize module '" + configModuleId + "' without a configure function.");
      }

      customConfig.configure(aurelia);
    });
  }

  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  return aurelia.start().then(() => aurelia.setRoot());
}

function run() {
  return ready().then((isNode: boolean) => {
    if (!isNode) {
      initialize();
    }

    const doc = PLATFORM.global.document;

    const appHost = doc.querySelectorAll('[aurelia-app],[data-aurelia-app]');
    return createLoader().then(loader => {
      return preparePlatform(loader).then(() => {
        for (let i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(loader, appHost[i]).catch(console.error.bind(console));
        }

        sharedLoader = loader;
        for (let i = 0, ii = bootstrapQueue.length; i < ii; ++i) {
          bootstrapQueue[i]();
        }
        bootstrapQueue = null;
      });
    });
  });
}

/**
 * Manually bootstraps an application.
 * @param configure A callback which passes an Aurelia instance to the developer to manually configure and start up the app.
 * @return A Promise that completes when configuration is done.
 */
export function bootstrap(configure: Function): Promise<void> {
  return onBootstrap(loader => {
    const aurelia = new Aurelia(loader);
    return configure(aurelia);
  });
}

export const starting = run();
