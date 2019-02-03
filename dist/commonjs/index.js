'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaBootstrapper = require('./aurelia-bootstrapper');

Object.keys(_aureliaBootstrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaBootstrapper[key];
    }
  });
});