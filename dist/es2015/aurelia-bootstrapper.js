import 'aurelia-polyfills';
import { PLATFORM } from 'aurelia-pal';
import { initialize } from 'aurelia-pal-browser';

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

function ready(global) {
  return new Promise((resolve, reject) => {
    if (global.document.readyState === 'complete') {
      resolve(global.document);
    } else {
      global.document.addEventListener('DOMContentLoaded', completed);
      global.addEventListener('load', completed);
    }

    function completed() {
      global.document.removeEventListener('DOMContentLoaded', completed);
      global.removeEventListener('load', completed);
      resolve(global.document);
    }
  });
}

function createLoader() {
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

  if (window.System && typeof window.System.import === 'function') {
    return System.normalize('aurelia-bootstrapper').then(bootstrapperName => {
      return System.normalize('aurelia-loader-default', bootstrapperName);
    }).then(loaderName => {
      return System.import(loaderName).then(m => new m.DefaultLoader());
    });
  }

  if (typeof window.require === 'function') {
    return new Promise((resolve, reject) => require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
  }

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function preparePlatform(loader) {
  return loader.normalize('aurelia-bootstrapper').then(bootstrapperName => {
    return loader.normalize('aurelia-framework', bootstrapperName).then(frameworkName => {
      loader.map('aurelia-framework', frameworkName);

      return Promise.all([loader.normalize('aurelia-dependency-injection', frameworkName).then(diName => loader.map('aurelia-dependency-injection', diName)), loader.normalize('aurelia-router', bootstrapperName).then(routerName => loader.map('aurelia-router', routerName)), loader.normalize('aurelia-logging-console', bootstrapperName).then(loggingConsoleName => loader.map('aurelia-logging-console', loggingConsoleName))]).then(() => {
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

  aurelia.use.standardConfiguration().developmentLogging();

  return aurelia.start().then(() => aurelia.setRoot());
}

function run() {
  return ready(window).then(doc => {
    initialize();

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

export function bootstrap(configure) {
  return onBootstrap(loader => {
    const aurelia = new Aurelia(loader);
    return configure(aurelia);
  });
}

run();