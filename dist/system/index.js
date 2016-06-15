'use strict';

System.register(['./aurelia-bootstrapper'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_aureliaBootstrapper) {
      var _exportObj = {};

      for (var _key in _aureliaBootstrapper) {
        if (_key !== "default") _exportObj[_key] = _aureliaBootstrapper[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});