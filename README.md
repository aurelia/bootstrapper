# aurelia-bootstrapper

This library is part of the [Aurelia](http://www.aurelia.io/) platform and contains the bootstrapper which sets up the default configuration for the aurelia framework and gets you up and running quick and easy.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to join us on [our Gitter Channel](https://gitter.im/aurelia/discuss).

## Dependencies

* [aurelia-loader-systemjs](https://github.com/aurelia/loader-systemjs)
* [aurelia-framework](https://github.com/aurelia/framework)
* [aurelia-logging-console](https://github.com/aurelia/logging-console)
* [aurelia-history](https://github.com/aurelia/history)
* [aurelia-history-browser](https://github.com/aurelia/history-browser)
* [aurelia-router](https://github.com/aurelia/router)
* [aurelia-templating-router](https://github.com/aurelia/templating-router)
* [aurelia-templating-binding](https://github.com/aurelia/templating-binding)
* [aurelia-templating-resources](https://github.com/aurelia/templating-resources)
* [aurelia-event-aggregator](https://github.com/aurelia/event-aggregator)

## Used By

The bootstrapper is intended to be used directly by applications only.

## Platform Support

This library can be used in the **browser** only.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
  
## Contributing

We'd love for you to contribute to our source code and to make this project even better than it is today! If this interests you, please begin by reading [our contributing guidelines](https://github.com/DurandalProject/about/blob/master/CONTRIBUTING.md). The contributing document will provide you with all the information you need to get started. Once you have read that, you will need to also [sign our CLA](http://goo.gl/forms/dI8QDDSyKR) before we can accepts a Pull Request from you. More information on the process is including in the [contributor's guide](https://github.com/DurandalProject/about/blob/master/CONTRIBUTING.md).
