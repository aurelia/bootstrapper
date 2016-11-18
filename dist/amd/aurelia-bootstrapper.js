define(['exports', 'aurelia-pal', 'aurelia-polyfills'], function (exports, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.bootstrap = bootstrap;


  var bootstrapQueue = [];
  var sharedLoader = null;
  var Aurelia = null;
  var host = _aureliaPal.PLATFORM.global;
  var bootstrapperName = void 0;

  function onBootstrap(callback) {
    return new Promise(function (resolve, reject) {
      if (sharedLoader) {
        resolve(callback(sharedLoader));
      } else {
        bootstrapQueue.push(function () {
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
    return new Promise(function (resolve, reject) {
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
    if (_aureliaPal.PLATFORM.Loader) {
      return Promise.resolve(new _aureliaPal.PLATFORM.Loader());
    }

    if (host.System && typeof host.System.import === 'function') {
      return host.System.normalize('aurelia-bootstrapper').then(function (bsn) {
        return host.System.normalize('aurelia-loader-default', bsn);
      }).then(function (loaderName) {
        return host.System.import(loaderName).then(function (m) {
          return new m.DefaultLoader();
        });
      });
    }

    if (typeof host.require === 'function') {
      return new Promise(function (resolve, reject) {
        return require(['aurelia-loader-default'], function (m) {
          return resolve(new m.DefaultLoader());
        }, reject);
      });
    }

    return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
  }

  function getPalImplementationName() {
    if (!_aureliaPal.PLATFORM.implementation) {
      if (typeof window !== 'undefined') {
        _aureliaPal.PLATFORM.implementation = 'aurelia-pal-browser';
      } else if (typeof self !== 'undefined') {
        _aureliaPal.PLATFORM.implementation = 'aurelia-pal-worker';
      } else if (typeof global !== 'undefined') {
        _aureliaPal.PLATFORM.implementation = 'aurelia-pal-nodejs';
      } else {
        throw new Error('Could not determine platform implementation to load.');
      }
    }

    return _aureliaPal.PLATFORM.implementation;
  }

  function preparePlatform(loader) {
    return loader.normalize('aurelia-bootstrapper').then(function (bsn) {
      bootstrapperName = bsn;
      return loader.normalize(getPalImplementationName(), bsn);
    }).then(function (palName) {
      return loader.loadModule(palName);
    }).then(function (palModule) {
      palModule.initialize();

      return loader.normalize('aurelia-framework', bootstrapperName).then(function (frameworkName) {
        loader.map('aurelia-framework', frameworkName);

        return Promise.all([loader.normalize('aurelia-dependency-injection', frameworkName).then(function (diName) {
          return loader.map('aurelia-dependency-injection', diName);
        }), loader.normalize('aurelia-router', bootstrapperName).then(function (routerName) {
          return loader.map('aurelia-router', routerName);
        }), loader.normalize('aurelia-logging-console', bootstrapperName).then(function (loggingConsoleName) {
          return loader.map('aurelia-logging-console', loggingConsoleName);
        })]).then(function () {
          return loader.loadModule(frameworkName).then(function (m) {
            return Aurelia = m.Aurelia;
          });
        });
      });
    });
  }

  function handleApp(loader, appHost) {
    var moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
    return config(loader, appHost, moduleId);
  }

  function config(loader, appHost, configModuleId) {
    var aurelia = new Aurelia(loader);
    aurelia.host = appHost;
    aurelia.configModuleId = configModuleId || null;

    if (configModuleId) {
      return loader.loadModule(configModuleId).then(function (customConfig) {
        if (!customConfig.configure) {
          throw new Error("Cannot initialize module '" + configModuleId + "' without a configure function.");
        }

        customConfig.configure(aurelia);
      });
    }

    aurelia.use.standardConfiguration().developmentLogging();

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }

  function run() {
    return ready().then(function () {
      return createLoader();
    }).then(function (loader) {
      return preparePlatform(loader).then(function () {
        var appHost = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
        var toConsole = console.error.bind(console);

        for (var i = 0, ii = appHost.length; i < ii; ++i) {
          handleApp(loader, appHost[i]).catch(toConsole);
        }

        sharedLoader = loader;
        for (var _i = 0, _ii = bootstrapQueue.length; _i < _ii; ++_i) {
          bootstrapQueue[_i]();
        }
        bootstrapQueue = null;
      });
    });
  }

  function bootstrap(configure) {
    return onBootstrap(function (loader) {
      var aurelia = new Aurelia(loader);
      return configure(aurelia);
    });
  }

  run();
});