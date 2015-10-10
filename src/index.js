import 'core-js';
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

function ready(global) {
  return new Promise((resolve, reject) => {
    if (global.document.readyState === 'complete') {
      resolve(global.document);
    } else {
      global.document.addEventListener('DOMContentLoaded', completed, false);
      global.addEventListener('load', completed, false);
    }

    function completed() {
      global.document.removeEventListener('DOMContentLoaded', completed, false);
      global.removeEventListener('load', completed, false);
      resolve(global.document);
    }
  });
}

function createLoader() {
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

  if (window.System) {
    let bootstrapperName = System.normalizeSync('aurelia-bootstrapper');
    let loaderName = System.normalizeSync('aurelia-loader-default', bootstrapperName);
    return System.import(loaderName).then(m => new m.DefaultLoader());
  } else if (window.require) {
    return new Promise((resolve, reject) => require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
  }

  throw new Error('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function preparePlatform(loader) {
  let bootstrapperName = loader.normalizeSync('aurelia-bootstrapper');

  let frameworkName = loader.normalizeSync('aurelia-framework', bootstrapperName);
  loader.map('aurelia-framework', frameworkName);

  let diName = loader.normalizeSync('aurelia-dependency-injection', frameworkName);
  loader.map('aurelia-dependency-injection', diName);

  let routerName = loader.normalizeSync('aurelia-router', bootstrapperName);
  loader.map('aurelia-router', routerName);

  let loggingConsoleName = loader.normalizeSync('aurelia-logging-console', bootstrapperName);
  loader.map('aurelia-logging-console', loggingConsoleName);

  return loader.loadModule(frameworkName).then(m => Aurelia = m.Aurelia);
}

function handleApp(loader, appHost) {
  let configModuleId = appHost.getAttribute('aurelia-app');
  return configModuleId ? customConfig(loader, appHost, configModuleId) : defaultConfig(loader, appHost);
}

function customConfig(loader, appHost, configModuleId) {
  return loader.loadModule(configModuleId)
    .then(m => {
      let aurelia = new Aurelia(loader);
      aurelia.host = appHost;
      return m.configure(aurelia);
    });
}

function defaultConfig(loader, appHost) {
  let aurelia = new Aurelia(loader);
  aurelia.host = appHost;

  if (window.location.protocol !== 'http' && window.location.protocol !== 'https') {
    aurelia.use.developmentLogging();
  }

  aurelia.use.standardConfiguration();

  return aurelia.start().then(a => a.setRoot());
}

function run() {
  return ready(window).then(doc => {
    initialize();

    let appHost = doc.querySelectorAll('[aurelia-app]');
    return createLoader().then(loader => {
      return preparePlatform(loader).then(() => {
        for (let i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(loader, appHost[i]).catch(logger.error.bind(logger));
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

export function bootstrap(configure: Function): Promise<void> {
  return onBootstrap(loader => {
    let aurelia = new Aurelia(loader);
    return configure(aurelia);
  });
}

run();
