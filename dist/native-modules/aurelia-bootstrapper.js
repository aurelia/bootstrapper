var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import 'aurelia-polyfills';
import { PLATFORM, isInitialized } from 'aurelia-pal';

var bootstrapPromises = [];
var startResolve = void 0;

var startPromise = new Promise(function (resolve) {
  return startResolve = resolve;
});
var host = PLATFORM.global;
var isNodeLike = typeof process !== 'undefined' && !process.browser;

function ready() {
  if (!host.document || host.document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise(function (resolve) {
    host.document.addEventListener('DOMContentLoaded', completed);
    host.addEventListener('load', completed);

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

  if (typeof AURELIA_WEBPACK_2_0 === 'undefined') {
    if (typeof __webpack_require__ !== 'undefined') {
      var m = __webpack_require__(require.resolve('aurelia-loader-webpack'));
      return Promise.resolve(new m.WebpackLoader());
    }

    if (host.System && typeof host.System.config === 'function') {
      return host.System.normalize('aurelia-bootstrapper').then(function (bsn) {
        return host.System.normalize('aurelia-loader-default', bsn);
      }).then(function (loaderName) {
        return host.System.import(loaderName).then(function (m) {
          return new m.DefaultLoader();
        });
      });
    }

    if (typeof host.require === 'function' && typeof host.define === 'function' && _typeof(host.define.amd) === 'object') {
      return new Promise(function (resolve, reject) {
        return host.require(['aurelia-loader-default'], function (m) {
          return resolve(new m.DefaultLoader());
        }, reject);
      });
    }

    if (isNodeLike && typeof module !== 'undefined' && typeof module.require !== 'undefined') {
      var _m = module.require('aurelia-loader-nodejs');
      return Promise.resolve(new _m.NodeJsLoader());
    }
  }

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function initializePal(loader) {
  if (isInitialized) return Promise.resolve();

  var type = void 0;

  var isRenderer = isNodeLike && (process.type === 'renderer' || process.versions['node-webkit']);

  if (isNodeLike && !isRenderer) {
    type = 'nodejs';
  } else if (typeof window !== 'undefined') {
    type = 'browser';
  } else if (typeof self !== 'undefined') {
    type = 'worker';
  } else {
    throw new Error('Could not determine platform implementation to load.');
  }

  return loader.loadModule('aurelia-pal-' + type).then(function (palModule) {
    return type === 'nodejs' && !isInitialized && palModule.globalize() || palModule.initialize();
  });
}

function preparePlatform(loader) {
  var map = function map(moduleId, relativeTo) {
    return loader.normalize(moduleId, relativeTo).then(function (normalized) {
      loader.map(moduleId, normalized);
      return normalized;
    });
  };

  return initializePal(loader).then(function () {
    return loader.normalize('aurelia-bootstrapper');
  }).then(function (bootstrapperName) {
    var frameworkPromise = map(PLATFORM.moduleName('aurelia-framework', { exports: ['Aurelia'] }), bootstrapperName);

    return Promise.all([frameworkPromise, frameworkPromise.then(function (frameworkName) {
      return map('aurelia-dependency-injection', frameworkName);
    }), map('aurelia-router', bootstrapperName), map('aurelia-logging-console', bootstrapperName)]);
  }).then(function (_ref) {
    var frameworkName = _ref[0];
    return loader.loadModule(frameworkName);
  }).then(function (fx) {
    return startResolve(function () {
      return new fx.Aurelia(loader);
    });
  });
}

function config(appHost, configModuleId, aurelia) {
  aurelia.host = appHost;
  aurelia.configModuleId = configModuleId || null;

  if (configModuleId) {
    return aurelia.loader.loadModule(configModuleId).then(function (customConfig) {
      if (!customConfig.configure) {
        throw new Error('Cannot initialize module \'' + configModuleId + '\' without a configure function.');
      }

      return customConfig.configure(aurelia);
    });
  }

  aurelia.use.standardConfiguration().developmentLogging();

  return aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}

function run() {
  return ready().then(createLoader).then(preparePlatform).then(function () {
    var appHosts = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
    for (var i = 0, ii = appHosts.length; i < ii; ++i) {
      var appHost = appHosts[i];
      var moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
      bootstrap(config.bind(null, appHost, moduleId));
    }

    var toConsole = console.error.bind(console);
    var bootstraps = bootstrapPromises.map(function (p) {
      return p.catch(toConsole);
    });
    bootstrapPromises = null;
    return Promise.all(bootstraps);
  });
}

export function bootstrap(configure) {
  var p = startPromise.then(function (factory) {
    return configure(factory());
  });
  if (bootstrapPromises) bootstrapPromises.push(p);
  return p;
}

export var starting = run();