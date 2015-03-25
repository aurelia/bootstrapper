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
    "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
    "aurelia-framework": "github:aurelia/framework@0.9.0",
    "aurelia-history": "github:aurelia/history@0.2.4",
    "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
    "aurelia-loader-default": "github:aurelia/loader-default@0.5.0",
    "aurelia-logging-console": "github:aurelia/logging-console@0.2.4",
    "aurelia-router": "github:aurelia/router@0.6.0",
    "aurelia-templating": "github:aurelia/templating@0.9.0",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.1",
    "aurelia-templating-router": "github:aurelia/templating-router@0.10.0",
    "github:aurelia/binding@0.3.7": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
    },
    "github:aurelia/binding@0.4.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
    },
    "github:aurelia/dependency-injection@0.4.5": {
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/dependency-injection@0.5.0": {
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/framework@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/history-browser@0.2.5": {
      "aurelia-history": "github:aurelia/history@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/loader-default@0.4.3": {
      "aurelia-loader": "github:aurelia/loader@0.3.5",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6"
    },
    "github:aurelia/loader-default@0.5.0": {
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4"
    },
    "github:aurelia/loader@0.3.5": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/loader@0.4.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/router@0.5.8": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/router@0.6.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-binding@0.8.7": {
      "aurelia-binding": "github:aurelia/binding@0.3.7",
      "aurelia-templating": "github:aurelia/templating@0.8.14"
    },
    "github:aurelia/templating-binding@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-resources@0.8.10": {
      "aurelia-binding": "github:aurelia/binding@0.3.7",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-templating": "github:aurelia/templating@0.8.14",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-resources@0.9.1": {
      "aurelia-binding": "github:aurelia/binding@0.4.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-router@0.10.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-router@0.9.4": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-router": "github:aurelia/router@0.5.8",
      "aurelia-templating": "github:aurelia/templating@0.8.14"
    },
    "github:aurelia/templating@0.8.14": {
      "aurelia-binding": "github:aurelia/binding@0.3.7",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.5",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.3.5",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.6",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

