define(['exports', 'core-js', 'aurelia-pal', 'aurelia-pal-browser'], function (exports, _coreJs, _aureliaPal, _aureliaPalBrowser) {
  'use strict';

  exports.__esModule = true;
  exports.bootstrap = bootstrap;

  var bootstrapQueue = [];
  var sharedLoader = null;
  var Aurelia = null;

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

  function ready(global) {
    return new Promise(function (resolve, reject) {
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
    if (_aureliaPal.PLATFORM.Loader) {
      return Promise.resolve(new _aureliaPal.PLATFORM.Loader());
    }

    if (window.System) {
      var bootstrapperName = System.normalizeSync('aurelia-bootstrapper');
      var loaderName = System.normalizeSync('aurelia-loader-default', bootstrapperName);
      return System['import'](loaderName).then(function (m) {
        return new m.DefaultLoader();
      });
    } else if (window.require) {
      return new Promise(function (resolve, reject) {
        return require(['aurelia-loader-default'], function (m) {
          return resolve(new m.DefaultLoader());
        }, reject);
      });
    }

    throw new Error('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
  }

  function preparePlatform(loader) {
    var bootstrapperName = loader.normalizeSync('aurelia-bootstrapper');

    var frameworkName = loader.normalizeSync('aurelia-framework', bootstrapperName);
    loader.map('aurelia-framework', frameworkName);

    var diName = loader.normalizeSync('aurelia-dependency-injection', frameworkName);
    loader.map('aurelia-dependency-injection', diName);

    var routerName = loader.normalizeSync('aurelia-router', bootstrapperName);
    loader.map('aurelia-router', routerName);

    var loggingConsoleName = loader.normalizeSync('aurelia-logging-console', bootstrapperName);
    loader.map('aurelia-logging-console', loggingConsoleName);

    return loader.loadModule(frameworkName).then(function (m) {
      return Aurelia = m.Aurelia;
    });
  }

  function handleApp(loader, appHost) {
    var configModuleId = appHost.getAttribute('aurelia-app');
    return configModuleId ? customConfig(loader, appHost, configModuleId) : defaultConfig(loader, appHost);
  }

  function customConfig(loader, appHost, configModuleId) {
    return loader.loadModule(configModuleId).then(function (m) {
      var aurelia = new Aurelia(loader);
      aurelia.host = appHost;
      return m.configure(aurelia);
    });
  }

  function defaultConfig(loader, appHost) {
    var aurelia = new Aurelia(loader);
    aurelia.host = appHost;

    if (window.location.protocol !== 'http' && window.location.protocol !== 'https') {
      aurelia.use.developmentLogging();
    }

    aurelia.use.standardConfiguration();

    return aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }

  function run() {
    return ready(window).then(function (doc) {
      _aureliaPalBrowser.initialize();

      var appHost = doc.querySelectorAll('[aurelia-app]');
      return createLoader().then(function (loader) {
        return preparePlatform(loader).then(function () {
          for (var i = 0, ii = appHost.length; i < ii; ++i) {
            handleApp(loader, appHost[i])['catch'](console.error.bind(console));
          }

          sharedLoader = loader;
          for (var i = 0, ii = bootstrapQueue.length; i < ii; ++i) {
            bootstrapQueue[i]();
          }
          bootstrapQueue = null;
        });
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