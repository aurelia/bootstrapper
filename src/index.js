/*eslint no-unused-vars:0*/
import core from 'core-js';

let bootstrapQueue = [];
let sharedLoader = null;
let Aurelia = null;

//TODO: initialize PAL

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
  if(window.AureliaLoader) {
    return Promise.resolve(new window.AureliaLoader());
  }

  if (window.System) {
    let bootstrapperName = System.normalizeSync('aurelia-bootstrapper');
    let loaderName = System.normalizeSync('aurelia-loader-default', bootstrapperName);
    return System.import(loaderName).then(m => new m.DefaultLoader());
  } else if (window.require) {
    return new Promise((resolve, reject) => require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
  }

  throw new Error('No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.');
}

function preparePlatform(loader) {
  let bootstrapperName = loader.normalizeSync('aurelia-bootstrapper');

  let frameworkName = loader.normalizeSync('aurelia-framework', bootstrapperName);
  loader.map('aurelia-framework', frameworkName);

  let loaderName = loader.normalizeSync('aurelia-loader', frameworkName);

  let diName = loader.normalizeSync('aurelia-dependency-injection', frameworkName);
  loader.map('aurelia-dependency-injection', diName)

  let routerName = loader.normalizeSync('aurelia-router', bootstrapperName);
  loader.map('aurelia-router', routerName);

  let loggingConsoleName = loader.normalizeSync('aurelia-logging-console', bootstrapperName);
  loader.map('aurelia-logging-console', loggingConsoleName);

  if('content' in document.createElement('template')) {
    return loader.loadModule(frameworkName).then(m => Aurelia = m.Aurelia);
  }

  let tmplName = loader.normalizeSync('aurelia-html-template-element', loaderName);
  return loader.loadModule(tmplName)
    .then(() => loader.loadModule(frameworkName).then(m => Aurelia = m.Aurelia));
}

function handleApp(loader, appHost) {
  let configModuleId = appHost.getAttribute('aurelia-app');
  return configModuleId ? aureliaLoader.config(loader, appHost, configModuleId) : aureliaLoader.defaultConfig(loader, appHost);
}

const aureliaLoader = {
  config(loader, appHost, configModuleId) {
    return loader.loadModule(configModuleId)
      .then(m => {
        let aurelia = new Aurelia(loader);
        aurelia.host = appHost;
        return m.configure(aurelia);
      });
  },
  defaultConfig(loader, appHost) {
    let aurelia = new Aurelia(loader);
    aurelia.host = appHost;

    if (window.location.protocol !== 'http' && window.location.protocol !== 'https') {
      aurelia.use.developmentLogging();
    }

    aurelia.use.standardConfiguration();

    return aurelia.start().then(a => a.setRoot());
  }
};

function run() {
  return ready(window).then(doc => {
    let appHost = doc.querySelectorAll('[aurelia-app]');
    return createLoader().then(loader => {
      return preparePlatform(loader).then(() => {
        for (let i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(loader, appHost[i]);
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

export function bootstrap(configure: (aurelia:Aurelia) => void): Promise<void> {
  return onBootstrap(loader => {
    let aurelia = new Aurelia(loader);
    return configure(aurelia);
  });
}

run();
