/*eslint no-unused-vars:0*/
import core from 'core-js';
import {Aurelia, LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('bootstrapper');
let readyQueue = [];
let isReady = false;

function onReady(callback) {
  return new Promise((resolve, reject) => {
    if (!isReady) {
      readyQueue.push(() => {
        try {
          resolve(callback());
        } catch (e) {
          reject(e);
        }
      });
    } else {
      resolve(callback());
    }
  });
}

export function bootstrap(configure: (aurelia:Aurelia) => void): Promise<void> {
  return onReady(() => {
    let loader = new window.AureliaLoader();
    let aurelia = new Aurelia(loader);

    return configure(aurelia);
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

function ensureLoader() {
  if (!window.AureliaLoader) {
    if (window.System && !window.System.isFake) {
      return System.normalize('aurelia-bootstrapper').then(bootstrapperName => {
        return System.normalize('aurelia-loader-default', bootstrapperName).then(loaderName => {
          return System.import(loaderName);
        });
      });
    } else if (window.require) {
      return new Promise((resolve, reject) => {
        require(['aurelia-loader-default'], resolve, reject);
      });
    }

    throw new Error('No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.');
  }

  return Promise.resolve();
}

function preparePlatform() {
  return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
    return System.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName) {
      System.map['aurelia-framework'] = frameworkName;

      return System.normalize('aurelia-loader', frameworkName).then(function(loaderName) {
        let toLoad = [];

        toLoad.push(System.normalize('aurelia-dependency-injection', frameworkName).then(function(name) {
          System.map['aurelia-dependency-injection'] = name;
        }));

        toLoad.push(System.normalize('aurelia-router', bootstrapperName).then(function(name) {
          System.map['aurelia-router'] = name;
        }));

        toLoad.push(System.normalize('aurelia-logging-console', bootstrapperName).then(function(name) {
          System.map['aurelia-logging-console'] = name;
        }));

        if (!('content' in document.createElement('template'))) {
          logger.debug('loading the HTMLTemplateElement polyfill');
          toLoad.push(System.normalize('aurelia-html-template-element', loaderName).then(function(name) {
            return System.import(name);
          }));
        }

        return Promise.all(toLoad);
      });
    });
  });
}

function runningLocally() {
  return window.location.protocol !== 'http' && window.location.protocol !== 'https';
}

function handleApp(appHost) {
  let configModuleId = appHost.getAttribute('aurelia-app');
  return configModuleId ? aureliaLoader.config(appHost, configModuleId) : aureliaLoader.defaultConfig(appHost);
}

const aureliaLoader = {
  config(appHost, configModuleId) {
    let loader = new window.AureliaLoader();

    return loader.loadModule(configModuleId)
      .then(m => {
        let aurelia = new Aurelia(loader);
        aurelia.host = appHost;
        return m.configure(aurelia);
      });
  },
  defaultConfig(appHost) {
    let aurelia = new Aurelia();
    aurelia.host = appHost;

    if (runningLocally()) {
      aurelia.use.developmentLogging();
    }

    aurelia.use.standardConfiguration();

    return aurelia.start().then(a => a.setRoot());
  }
};

function run() {
  return ready(window).then(doc => {
    let appHost = doc.querySelectorAll('[aurelia-app]');

    return ensureLoader().then(() => {
      return preparePlatform().then(() => {
        for (let i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(appHost[i]);
        }

        isReady = true;
        for (let i = 0, ii = readyQueue.length; i < ii; ++i) {
          readyQueue[i]();
        }
        readyQueue = [];
      });
    });
  });
}

run();
