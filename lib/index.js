import {SystemJSLoader} from 'aurelia-loader-systemjs';
import {Aurelia, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import {History} from 'aurelia-history';
import {BrowserHistory} from 'aurelia-history-browser';
import {RouteLoader, Router, AppRouter} from 'aurelia-router';
import {TemplatingRouteLoader,RouterViewPort} from 'aurelia-templating-router';
import {TemplatingBindingLanguage} from 'aurelia-templating-binding';
import {Show, If, Repeat, Compose, SelectedItem} from 'aurelia-templating-resources';

var defaultResources = [Show, If, Repeat, Compose, RouterViewPort, SelectedItem];

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

function configureAurelia(aurelia){
  return aurelia.withSingleton(RouteLoader, TemplatingRouteLoader)
                .withSingleton(History, BrowserHistory)
                .withSingleton(Router, AppRouter)
                .withBindingLanguage(TemplatingBindingLanguage)
                .withResources(defaultResources);
}

function handleMain(mainHost){
  var mainModuleId = mainHost.getAttribute('aurelia-main') || 'main';
  var loader = new RequireJSLoader();
  return loader.loadModule(mainModuleId)
    .then(m => {
      m.configure(configureAurelia(new Aurelia(loader)));
    }).catch(e => {
      setTimeout(function(){ throw e; }, 0);
    });
}

function handleApp(appHost){
  var appModuleId = appHost.getAttribute('aurelia-app') || 'app';
  return configureAurelia(new Aurelia()).start().then(a => {
    return a.setRoot(appModuleId, null, appHost);
  }).catch(e => {
    setTimeout(function(){ throw e; }, 0);
  });
}

function runningLocally(){
  return window.location.protocol !== 'http' &&
    window.location.protocol !== 'https';
}

function run(){
  return ready(window).then(doc => {
    var mainHost = doc.querySelectorAll('[aurelia-main]'),
        appHost = doc.querySelectorAll('[aurelia-app]'),
        i, ii;

    if(appHost.length && !mainHost.length && runningLocally()){
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(LogManager.levels.debug);
    }

    for (i = 0, ii = mainHost.length; i < ii; ++i) {
      handleMain(mainHost[i]);
    }

    for (i = 0, ii = appHost.length; i < ii; ++i) {
      handleApp(appHost[i]);
    }
  });
}

run();