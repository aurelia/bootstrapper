define(['exports', './aurelia-bootstrapper'], function (exports, _aureliaBootstrapper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaBootstrapper).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaBootstrapper[key];
      }
    });
  });
});