import 'aurelia-polyfills';
import {PLATFORM} from 'aurelia-pal';

let bootstrapQueue = [];
let sharedLoader = null;
let Aurelia = null;
let host = PLATFORM.global;
let bootstrapperName;

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
    if (host.document.readyState === 'complete') {
      resolve();
    } else {
      host.document.addEventListener('DOMContentLoaded', completed);
      host.addEventListener('load', completed);
    }

    function completed() {
      host.document.removeEventListener('DOMContentLoaded', completed);
      host.removeEventListener('load', completed);
      resolve();
    }
  });
}

function createLoader() {
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

  if (host.System && typeof host.System.import === 'function') {
    return host.System.normalize('aurelia-bootstrapper').then(bsn => {
      return host.System.normalize('aurelia-loader-default', bsn);
    }).then(loaderName => {
      return host.System.import(loaderName).then(m => new m.DefaultLoader());
    });
  }

  if (typeof host.require === 'function') {
    return new Promise((resolve, reject) => require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
  }

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function getPalImplementationName() {
  if (!PLATFORM.implementation) {
    if (typeof window !== 'undefined') {
      PLATFORM.implementation = 'aurelia-pal-browser';
    } else if (typeof self !== 'undefined') {
      PLATFORM.implementation = 'aurelia-pal-worker';
    } else if (typeof global !== 'undefined') {
      PLATFORM.implementation = 'aurelia-pal-nodejs';
    } else {
      throw new Error('Could not determine platform implementation to load.');
    }
  }

  return PLATFORM.implementation;
}

function preparePlatform(loader) {
  return loader.normalize('aurelia-bootstrapper')
    .then(bsn => {
      bootstrapperName = bsn;
      return loader.normalize(getPalImplementationName(), bsn);
    })
    .then(palName => loader.loadModule(palName))
    .then(palModule => {
      palModule.initialize();

      return loader.normalize('aurelia-framework', bootstrapperName)
        .then(frameworkName => {
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
  return ready()
    .then(() => createLoader())
    .then(loader => {
      return preparePlatform(loader).then(() => {
        const appHost = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
        const toConsole = console.error.bind(console);

        for (let i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(loader, appHost[i]).catch(toConsole);
        }

        sharedLoader = loader;
        for (let i = 0, ii = bootstrapQueue.length; i < ii; ++i) {
          bootstrapQueue[i]();
        }
        bootstrapQueue = null;
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

/**
 * A promise that represents the bootstrapper's startup process.
 * It resolves when the process has finished starting.
 */
export const starting = run();
