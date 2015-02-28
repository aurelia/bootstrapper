System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "aurelia-bootstrapper/*": "dist/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.3",
    "aurelia-framework": "github:aurelia/framework@0.8.7",
    "aurelia-history": "github:aurelia/history@0.2.3",
    "aurelia-history-browser": "github:aurelia/history-browser@0.2.4",
    "aurelia-loader-default": "github:aurelia/loader-default@0.4.2",
    "aurelia-logging-console": "github:aurelia/logging-console@0.2.3",
    "aurelia-router": "github:aurelia/router@0.5.7",
    "aurelia-templating": "github:aurelia/templating@0.8.13",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.8.6",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.8.9",
    "aurelia-templating-router": "github:aurelia/templating-router@0.9.3",
    "github:aurelia/binding@0.3.6": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.4"
    },
    "github:aurelia/dependency-injection@0.4.4": {
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/framework@0.8.7": {
      "aurelia-binding": "github:aurelia/binding@0.3.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-loader": "github:aurelia/loader@0.3.4",
      "aurelia-logging": "github:aurelia/logging@0.2.4",
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.4",
      "aurelia-templating": "github:aurelia/templating@0.8.13"
    },
    "github:aurelia/history-browser@0.2.4": {
      "aurelia-history": "github:aurelia/history@0.2.3",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/loader-default@0.4.2": {
      "aurelia-loader": "github:aurelia/loader@0.3.4",
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "aurelia-path": "github:aurelia/path@0.4.4"
    },
    "github:aurelia/loader@0.3.4": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/router@0.5.7": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.3",
      "aurelia-history": "github:aurelia/history@0.2.3",
      "aurelia-path": "github:aurelia/path@0.4.4",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.3",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-binding@0.8.6": {
      "aurelia-binding": "github:aurelia/binding@0.3.6",
      "aurelia-templating": "github:aurelia/templating@0.8.13"
    },
    "github:aurelia/templating-resources@0.8.9": {
      "aurelia-binding": "github:aurelia/binding@0.3.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-logging": "github:aurelia/logging@0.2.4",
      "aurelia-templating": "github:aurelia/templating@0.8.13",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-router@0.9.3": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "aurelia-path": "github:aurelia/path@0.4.4",
      "aurelia-router": "github:aurelia/router@0.5.7",
      "aurelia-templating": "github:aurelia/templating@0.8.13"
    },
    "github:aurelia/templating@0.8.13": {
      "aurelia-binding": "github:aurelia/binding@0.3.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.4",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.3.4",
      "aurelia-logging": "github:aurelia/logging@0.2.4",
      "aurelia-metadata": "github:aurelia/metadata@0.3.2",
      "aurelia-path": "github:aurelia/path@0.4.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.0"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

