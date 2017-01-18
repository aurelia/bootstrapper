import 'aurelia-polyfills';
import {PLATFORM, isInitialized} from 'aurelia-pal';

let bootstrapQueue = [];
let sharedLoader = null;
let Aurelia = null;
const host = PLATFORM.global;
const isNodeLike = typeof process !== 'undefined' && !process.browser;

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
    if (!host.document || host.document.readyState === 'complete') {
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
  // Note: Please do NOT add any PLATFORM.moduleName annotation in this method,
  //       for example around 'aurelia-loader-webpack'.
  //       Each import has been carefully written so that it is picked up by 
  //       its respective bundler and is ignored by others.
  //       Adding moduleName() would add a static dependency, which we don't 
  //       want as the correct loader is determined at build time.

  // Custom Loader Support
  if (PLATFORM.Loader) {
    return Promise.resolve(new PLATFORM.Loader());
  }

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
  if (typeof host.require === 'function' && typeof host.require.version === 'string') {
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

  return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
}

function initializePal(loader) {
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
  // Note: Please do NOT add PLATFORM.moduleName() others than 'aurelia-framework'.
  //       This is the _only_ module actually loaded by the bootstrapper.
  //       The other ones are fake dependencies, if you look at the code carefully you'll 
  //       notice that they are just some name resolutions and mapping; nothing gets loaded.

  return initializePal(loader)
    .then(() => loader.normalize('aurelia-bootstrapper'))
    .then(bootstrapperName => {
      // aurelia-framework re-exports pretty much everything.
      // As can be seen at the end of this method, the only field accessed by bootstrapper is `Aurelia`,
      // so we document that to enable tree shaking on all other exported members.
      return loader.normalize(PLATFORM.moduleName('aurelia-framework', { exports: ['Aurelia'] }),
                              bootstrapperName)
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
