import 'aurelia-polyfills';
import { PLATFORM, isInitialized } from 'aurelia-pal';

let bootstrapPromises = [];
let startResolve;

const startPromise = new Promise(resolve => startResolve = resolve);
const host = PLATFORM.global;
const isNodeLike = typeof process !== 'undefined' && !process.browser;

function ready() {
  if (!host.document || host.document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise(resolve => {
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
      const m = __webpack_require__(require.resolve('aurelia-loader-webpack'));
      return Promise.resolve(new m.WebpackLoader());
    }

    if (host.System && typeof host.System.config === 'function') {
      return host.System.normalize('aurelia-bootstrapper').then(bsn => {
        return host.System.normalize('aurelia-loader-default', bsn);
      }).then(loaderName => {
        return host.System.import(loaderName).then(m => new m.DefaultLoader());
      });
    }

    if (typeof host.require === 'function' && typeof host.define === 'function' && typeof host.define.amd === 'object') {
      return new Promise((resolve, reject) => host.require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
    }

    if (isNodeLike && typeof module !== 'undefined' && typeof module.require !== 'undefined') {
      const m = module.require('aurelia-loader-nodejs');
      return Promise.resolve(new m.NodeJsLoader());
    }
  }

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function initializePal(loader) {
  if (isInitialized) return Promise.resolve();

  let type;

  const isRenderer = isNodeLike && (process.type === 'renderer' || process.versions['node-webkit']);

  if (isNodeLike && !isRenderer) {
    type = 'nodejs';
  } else if (typeof window !== 'undefined') {
    type = 'browser';
  } else if (typeof self !== 'undefined') {
    type = 'worker';
  } else {
    throw new Error('Could not determine platform implementation to load.');
  }

  return loader.loadModule('aurelia-pal-' + type).then(palModule => type === 'nodejs' && !isInitialized && palModule.globalize() || palModule.initialize());
}

function preparePlatform(loader) {
  const map = (moduleId, relativeTo) => loader.normalize(moduleId, relativeTo).then(normalized => {
    loader.map(moduleId, normalized);
    return normalized;
  });

  return initializePal(loader).then(() => loader.normalize('aurelia-bootstrapper')).then(bootstrapperName => {
    const frameworkPromise = map(PLATFORM.moduleName('aurelia-framework', { exports: ['Aurelia'] }), bootstrapperName);

    return Promise.all([frameworkPromise, frameworkPromise.then(frameworkName => map('aurelia-dependency-injection', frameworkName)), map('aurelia-router', bootstrapperName), map('aurelia-logging-console', bootstrapperName)]);
  }).then(([frameworkName]) => loader.loadModule(frameworkName)).then(fx => startResolve(() => new fx.Aurelia(loader)));
}

function config(appHost, configModuleId, aurelia) {
  aurelia.host = appHost;
  aurelia.configModuleId = configModuleId || null;

  if (configModuleId) {
    return aurelia.loader.loadModule(configModuleId).then(customConfig => {
      if (!customConfig.configure) {
        throw new Error(`Cannot initialize module '${configModuleId}' without a configure function.`);
      }

      return customConfig.configure(aurelia);
    });
  }

  aurelia.use.standardConfiguration().developmentLogging();

  return aurelia.start().then(() => aurelia.setRoot());
}

function run() {
  return ready().then(createLoader).then(preparePlatform).then(() => {
    const appHosts = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
    for (let i = 0, ii = appHosts.length; i < ii; ++i) {
      const appHost = appHosts[i];
      const moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
      bootstrap(config.bind(null, appHost, moduleId));
    }

    const toConsole = console.error.bind(console);
    const bootstraps = bootstrapPromises.map(p => p.catch(toConsole));
    bootstrapPromises = null;
    return Promise.all(bootstraps);
  });
}

export function bootstrap(configure) {
  const p = startPromise.then(factory => configure(factory()));
  if (bootstrapPromises) bootstrapPromises.push(p);
  return p;
}

export const starting = run();