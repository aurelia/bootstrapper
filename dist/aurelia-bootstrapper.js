import 'aurelia-polyfills';
import {PLATFORM,isInitialized} from 'aurelia-pal';

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
  // Note: Please do NOT add any PLATFORM.moduleName annotation in this method,
  //       for example around 'aurelia-loader-default'.
  //       Each import has been carefully written so that it is picked up by
  //       its respective bundler and is ignored by others.
  //       Adding moduleName() would add a static dependency, which we don't
  //       want as the correct loader is determined at build time.

  // Custom Loader Support
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

  if (typeof AURELIA_WEBPACK_2_0 === 'undefined') {
    // Webpack Loader Support
    if (typeof __webpack_require__ !== 'undefined') {
      // Webpack needs the require to be top level to parse the request.
      // However, we don't want to use require or that will cause the Babel
      // transpiler to detect an incorrect dependency.
      const m = __webpack_require__(require.resolve('aurelia-loader-webpack'));
      return Promise.resolve(new m.WebpackLoader());
    }

    // SystemJS Loader Support
    if (host.System && typeof host.System.config === 'function') {
      return host.System.normalize('aurelia-bootstrapper').then(bsn => {
        return host.System.normalize('aurelia-loader-default', bsn);
      }).then(loaderName => {
        return host.System.import(loaderName).then(m => new m.DefaultLoader());
      });
    }

    // AMD Module Loader Support
    if (typeof host.require === 'function' && typeof host.define === 'function' && typeof host.define.amd === 'object') {
      return new Promise((resolve, reject) => host.require(['aurelia-loader-default'], m => resolve(new m.DefaultLoader()), reject));
    }

    // Node.js and Electron Support
    if (isNodeLike && typeof module !== 'undefined' && typeof module.require !== 'undefined') {
      // note: we use a scoped module.require() instead of simply require()
      // so that Webpack's parser does not automatically include this loader as a dependency,
      // similarly to the non-global call to System.import() above
      const m = module.require('aurelia-loader-nodejs');
      return Promise.resolve(new m.NodeJsLoader());
    }
  } // endif AURELIA_WEBPACK_2_0

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

  // Note: Please do NOT try to add PLATFORM.moduleName() annotations here.
  //       This would create a static dependency between bootstrapper and a PAL, which we don't want.
  //       The correct PAL to bundle must be determined by the bundling tool at build time.
  return loader.loadModule('aurelia-pal-' + type)
               .then(palModule => type === 'nodejs' && !isInitialized && palModule.globalize() || palModule.initialize());
}

function preparePlatform(loader) {
  const map = (moduleId, relativeTo) =>
    loader.normalize(moduleId, relativeTo)
          .then(normalized => {
            loader.map(moduleId, normalized);
            return normalized;
          });

  return initializePal(loader)
    .then(() => loader.normalize('aurelia-bootstrapper'))
    .then(bootstrapperName => {
      // aurelia-framework re-exports pretty much everything.
      // As can be seen at the end of this method, the only field accessed by bootstrapper is `Aurelia`,
      // so we document that to enable tree shaking on all other exported members.
      const frameworkPromise = map(PLATFORM.moduleName('aurelia-framework', { exports: ['Aurelia'] }),
                                   bootstrapperName);
      // Please do NOT add PLATFORM.moduleName() around any of those modules.
      // They are not actually loaded here, only mapped.
      return Promise.all([
        frameworkPromise,
        frameworkPromise.then(frameworkName => map('aurelia-dependency-injection', frameworkName)),
        map('aurelia-router', bootstrapperName),
        map('aurelia-logging-console', bootstrapperName)
      ]);
    })
    .then(([frameworkName]) => loader.loadModule(frameworkName))
    .then(fx => startResolve(() => new fx.Aurelia(loader)));
}

function config(appHost, configModuleId, aurelia) {
  aurelia.host = appHost;
  aurelia.configModuleId = configModuleId || null;

  if (configModuleId) {
    return aurelia.loader
      .loadModule(configModuleId)
      .then(customConfig => {
        if (!customConfig.configure) {
          throw new Error(`Cannot initialize module '${configModuleId}' without a configure function.`);
        }

        return customConfig.configure(aurelia);
      });
  }

  aurelia.use
         .standardConfiguration()
         .developmentLogging();

  return aurelia.start().then(() => aurelia.setRoot());
}

function run() {
  return ready()
    .then(createLoader)
    .then(preparePlatform)
    .then(() => {
      const appHosts = host.document.querySelectorAll('[aurelia-app],[data-aurelia-app]');
      for (let i = 0, ii = appHosts.length; i < ii; ++i) {
        const appHost = appHosts[i];
        const moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
        bootstrap(config.bind(null, appHost, moduleId));
      }

      // This can't be moved before preparePlatform.
      // In old IE the console object only exists after F12 tools have been opened and PAL creates a substitute.
      const toConsole = console.error.bind(console);
      const bootstraps = bootstrapPromises.map(p => p.catch(toConsole));
      bootstrapPromises = null;
      return Promise.all(bootstraps);
    });
}

/**
 * Manually bootstraps an application.
 * @param configure A callback which passes an Aurelia instance to the developer to manually configure and start up the app.
 * @return A Promise that completes when configuration is done.
 */
export function bootstrap(configure: Function): Promise<void> {
  const p = startPromise.then(factory => configure(factory()));
  if (bootstrapPromises) bootstrapPromises.push(p);
  return p;
}

/**
 * A promise that represents the bootstrapper's startup process.
 * It resolves when the process has finished starting.
 */
export const starting = run();
