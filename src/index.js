import {SystemJSLoader} from 'aurelia-loader-systemjs';
import {Aurelia, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

var logger = LogManager.getLogger('bootstrapper');

function ready(global) {
  return new Promise((resolve, reject) =>{
    if (global.document.readyState === "complete" ) {
      resolve(global.document);
    } else {
      global.document.addEventListener("DOMContentLoaded", completed, false);
      global.addEventListener("load", completed, false);
    }

    function completed() {
      global.document.removeEventListener("DOMContentLoaded", completed, false);
      global.removeEventListener("load", completed, false);
      resolve(global.document);
    }
  });
}

function loadPolyfills(){
  return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName){
    return System.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName){
      System.map['aurelia-framework'] = frameworkName;

      return System.normalize('aurelia-loader', frameworkName).then(function(loaderName){
        var toLoad = [];

        logger.debug('loading the es6-shim polyfill');
        toLoad.push(System.normalize('es6-shim', loaderName).then(function(name){
          return System.import(name);
        }));

        toLoad.push(System.normalize('aurelia-depedency-injection', frameworkName).then(function(name){
          System.map['aurelia-depedency-injection'] = name;
        }));

        toLoad.push(System.normalize('aurelia-router', bootstrapperName).then(function(name){
          System.map['aurelia-router'] = name;
        }));

        toLoad.push(System.normalize('aurelia-logging-console', bootstrapperName).then(function(name){
          System.map['aurelia-logging-console'] = name;
        }));

        if(!('import' in document.createElement('link'))){
          logger.debug('loading the HTMLImports polyfill');
          toLoad.push(System.normalize('webcomponentsjs/HTMLImports.min', loaderName).then(function(name){
            return System.import(name);
          }));
        }

        if(!("content" in document.createElement("template"))){
          logger.debug('loading the HTMLTemplateElement polyfill');
          toLoad.push(System.normalize('aurelia-html-template-element', loaderName).then(function(name){
            return System.import(name);
          }));
        }

        return Promise.all(toLoad);
      });
    });
  });
}

function configureAurelia(aurelia){
  return System.normalize('aurelia-bootstrapper').then(function(bName){
    var toLoad = [];

    toLoad.push(System.normalize('aurelia-templating-binding', bName).then(templatingBinding => {
      aurelia.plugins.installBindingLanguage = function(){
        aurelia.plugins.install(templatingBinding);
        return this;
      };
    }));

    toLoad.push(System.normalize('aurelia-history-browser', bName).then(historyBrowser => {
      return System.normalize('aurelia-templating-router', bName).then(templatingRouter => {
        aurelia.plugins.installRouter = function(){
          aurelia.plugins.install(historyBrowser);
          aurelia.plugins.install(templatingRouter);
          return this;
        };
      });
    }));

    toLoad.push(System.normalize('aurelia-templating-resources', bName).then(name => {
      aurelia.plugins.installResources = function(){
        aurelia.plugins.install(name);
        return this;
      }
    }));

    toLoad.push(System.normalize('aurelia-event-aggregator', bName).then(eventAggregator => {
      System.map['aurelia-event-aggregator'] = eventAggregator;
      aurelia.plugins.installEventAggregator = function(){
        aurelia.plugins.install(eventAggregator);
        return this;
      };
    }));

    return Promise.all(toLoad);
  });
}

function handleMain(mainHost){
  var mainModuleId = mainHost.getAttribute('aurelia-main') || 'main',
      loader = new SystemJSLoader();

  return loader.loadModule(mainModuleId)
    .then(m => {
      var aurelia = new Aurelia(loader);
      return configureAurelia(aurelia).then(() => { return m.configure(aurelia); });
    }).catch(e => {
      setTimeout(function(){ throw e; }, 0);
    });
}

function handleApp(appHost){
  var appModuleId = appHost.getAttribute('aurelia-app') || 'app',
      aurelia = new Aurelia();

  return configureAurelia(aurelia).then(() => {
    aurelia.plugins
      .installBindingLanguage()
      .installResources()
      .installRouter()
      .installEventAggregator();

    return aurelia.start().then(a => { return a.setRoot(appModuleId, appHost); });
  }).catch(e => {
    setTimeout(function(){ throw e; }, 0);
  });
}

function runningLocally(){
  return window.location.protocol !== 'http' &&
    window.location.protocol !== 'https';
}

function run() {
  return ready(window).then(function (doc) {
    var mainHost = doc.querySelectorAll("[aurelia-main]"), 
        appHost = doc.querySelectorAll("[aurelia-app]"), 
        i, ii;
    
    if (appHost.length && !mainHost.length && runningLocally()) {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(LogManager.levels.debug);
    }

    return loadPolyfills().then(function(){
      for (i = 0, ii = mainHost.length; i < ii; ++i) {
        handleMain(mainHost[i]);
      }

      for (i = 0, ii = appHost.length; i < ii; ++i) {
        handleApp(appHost[i]);
      }
    });
  });
}

run();