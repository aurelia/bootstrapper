"use strict";

var SystemJSLoader = require('aurelia-loader-systemjs').SystemJSLoader;
var Aurelia = require('aurelia-framework').Aurelia;
var LogManager = require('aurelia-framework').LogManager;
var ConsoleAppender = require('aurelia-logging-console').ConsoleAppender;
var History = require('aurelia-history').History;
var BrowserHistory = require('aurelia-history-browser').BrowserHistory;
var RouteLoader = require('aurelia-router').RouteLoader;
var Router = require('aurelia-router').Router;
var AppRouter = require('aurelia-router').AppRouter;
var TemplatingRouteLoader = require('aurelia-templating-router').TemplatingRouteLoader;
var RouterView = require('aurelia-templating-router').RouterView;
var TemplatingBindingLanguage = require('aurelia-templating-binding').TemplatingBindingLanguage;
var Show = require('aurelia-templating-resources').Show;
var If = require('aurelia-templating-resources').If;
var Repeat = require('aurelia-templating-resources').Repeat;
var Compose = require('aurelia-templating-resources').Compose;
var SelectedItem = require('aurelia-templating-resources').SelectedItem;


var defaultResources = [Show, If, Repeat, Compose, RouterView, SelectedItem];
var logger = LogManager.getLogger("bootstrapper");

function ready(global) {
  return new Promise(function (resolve, reject) {
    if (global.document.readyState === "complete") {
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

function loadPolyfills() {
  return System.normalize("aurelia-bootstrapper").then(function (bootstrapperName) {
    return System.normalize("aurelia-framework", bootstrapperName).then(function (frameworkName) {
      System.map["aurelia-framework"] = frameworkName;

      return System.normalize("aurelia-loader", frameworkName).then(function (loaderName) {
        var toLoad = [];

        logger.debug("loading the es6-shim polyfill");
        toLoad.push(System.normalize("es6-shim", loaderName).then(function (name) {
          return System["import"](name);
        }));

        toLoad.push(System.normalize("aurelia-router", bootstrapperName).then(function (name) {
          System.map["aurelia-router"] = name;
        }));

        if (!("import" in document.createElement("link"))) {
          logger.debug("loading the HTMLImports polyfill");
          toLoad.push(System.normalize("webcomponentsjs/HTMLImports.min", loaderName).then(function (name) {
            return System["import"](name);
          }));
        }

        if (!("content" in document.createElement("template"))) {
          logger.debug("loading the HTMLTemplateElement polyfill");
          toLoad.push(System.normalize("aurelia-html-template-element", loaderName).then(function (name) {
            return System["import"](name);
          }));
        }

        return Promise.all(toLoad);
      });
    });
  });
}

function configureAurelia(aurelia) {
  return aurelia.withSingleton(RouteLoader, TemplatingRouteLoader).withSingleton(History, BrowserHistory).withSingleton(Router, AppRouter).withBindingLanguage(TemplatingBindingLanguage).withResources(defaultResources);
}

function handleMain(mainHost) {
  var mainModuleId = mainHost.getAttribute("aurelia-main") || "main";
  var loader = new SystemJSLoader();
  return loader.loadModule(mainModuleId).then(function (m) {
    m.configure(configureAurelia(new Aurelia(loader)));
  })["catch"](function (e) {
    setTimeout(function () {
      throw e;
    }, 0);
  });
}

function handleApp(appHost) {
  var appModuleId = appHost.getAttribute("aurelia-app") || "app";
  return configureAurelia(new Aurelia()).start().then(function (a) {
    return a.setRoot(appModuleId, null, appHost);
  })["catch"](function (e) {
    setTimeout(function () {
      throw e;
    }, 0);
  });
}

function runningLocally() {
  return window.location.protocol !== "http" && window.location.protocol !== "https";
}

function run() {
  return ready(window).then(function (doc) {
    var mainHost = doc.querySelectorAll("[aurelia-main]"), appHost = doc.querySelectorAll("[aurelia-app]"), i, ii;

    if (appHost.length && !mainHost.length && runningLocally()) {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(LogManager.levels.debug);
    }

    return loadPolyfills().then(function () {
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