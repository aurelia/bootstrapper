### 0.13.1 (2015-06-09)


#### Bug Fixes

* **index:** detect System or require api and load appropriately ([2fa4d3e7](http://github.com/aurelia/bootstrapper/commit/2fa4d3e7a6f525912ed1384c6eab33ff34960eb0), closes [#110](http://github.com/aurelia/bootstrapper/issues/110))


## 0.13.0 (2015-06-08)


#### Bug Fixes

* **all:** break out the history from the router plugin config ([864cf2c2](http://github.com/aurelia/bootstrapper/commit/864cf2c2d17bb9dd4d6642b7a7544de25e985926))
* **bootstrapper:** remove catch handlers that kill stack traces during startup ([e867ca1f](http://github.com/aurelia/bootstrapper/commit/e867ca1f2c9865e65448c3a5f8074d2711cfe991))


## 0.12.0 (2015-05-01)


#### Bug Fixes

* **all:**
  * root should default to aurelia-app host when not specified ([ed3b7124](http://github.com/aurelia/bootstrapper/commit/ed3b712483696c73b8202ef51cc191b3c4493f35), closes [#5](http://github.com/aurelia/bootstrapper/issues/5))
  * update to logLevel enum name api change ([64d8edf3](http://github.com/aurelia/bootstrapper/commit/64d8edf355c4caf13fbd02e888a3eaa038ffadf4))
* **bootstrapper:** removees5-specific helper detection ([d55802b2](http://github.com/aurelia/bootstrapper/commit/d55802b26f44ff7d837bc8fe1a4b05795f58a57d))
* **preparePlatform:** correct spelling ([010f0a9a](http://github.com/aurelia/bootstrapper/commit/010f0a9a25fe9ccd6536fbb1cfd10b9648aa4abc))


## 0.11.0 (2015-04-09)


#### Features

* **all:**
  * remove AtScript support ([65134367](http://github.com/aurelia/bootstrapper/commit/651343677e3d4d8825f065a7bad8d72708ac83b0))
  * update compiler and core-is integration ([52d84e7a](http://github.com/aurelia/bootstrapper/commit/52d84e7a6594304f418da63d47cd734c99bf0afc))


## 0.10.0 (2015-03-25)


#### Bug Fixes

* **bootstrapper:** change how default loader is discovered ([13b04160](http://github.com/aurelia/bootstrapper/commit/13b0416081d1cea542e7b54edb086e6ade977692))


#### Features

* **bootstrapper:** new startup logic ([373bf740](http://github.com/aurelia/bootstrapper/commit/373bf740da2cffbeb33a652dd538ec1f1ce2f4c7))


### 0.9.5 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([f82ca368](http://github.com/aurelia/bootstrapper/commit/f82ca3689a8b5aa197b22bd804dae0cbfd0cab7a))


### 0.9.4 (2015-02-28)


#### Bug Fixes

* **build:** add missing bower bump ([e72cf895](http://github.com/aurelia/bootstrapper/commit/e72cf8957e5ca912dbd9a3c2bc2287050450d258))
* **package:** update dependencies ([f3435bf8](http://github.com/aurelia/bootstrapper/commit/f3435bf8ecf8beff79494e1d68538fa5688379fd))


### 0.9.3 (2015-01-29)

#### Features

* **bootstrapper:** allow for bootstrapping from the main module


### 0.9.2 (2015-01-24)


#### Bug Fixes

* **bootstrapped:** ensure that templating resources are in System.map ([fb6ad861](http://github.com/aurelia/bootstrapper/commit/fb6ad8615483c7f9dedb017599c4f04bb6135c61))


### 0.9.1 (2015-01-24)


#### Bug Fixes

* **package:** update deps and fix bower semver ranges ([8754ff0e](http://github.com/aurelia/bootstrapper/commit/8754ff0e915780ed14797eadcb43d9dccb60bf11))


## 0.9.0 (2015-01-22)


#### Bug Fixes

* **all:** use default loader ([8acf5996](http://github.com/aurelia/bootstrapper/commit/8acf599669c59fb9b5625a98dcbc3f7acd5ce45f))
* **package:** update dependencies ([a8811da7](http://github.com/aurelia/bootstrapper/commit/a8811da77ecb80ca11b0e7adaec8a76e841517cc))


#### Features

* **all:** update to new plugin api ([50fc5ce6](http://github.com/aurelia/bootstrapper/commit/50fc5ce6f56bd24f3dbbc66a7f5aa0b93f7cbfed))
* **bootstrapper:** identify polyfilled system and skip core-js ([76fab9a1](http://github.com/aurelia/bootstrapper/commit/76fab9a153ac71ff78e6d6e5a544b8df05041a5e))


## 0.8.0 (2015-01-12)


#### Bug Fixes

* **package:** update Aurelia dependencies ([37aeca13](http://github.com/aurelia/bootstrapper/commit/37aeca13b7b14800c6f15f9103ba20c0c0a28ac3))


## 0.7.0 (2015-01-07)


#### Bug Fixes

* **package:** update dependencies to latest ([57c487a0](http://github.com/aurelia/bootstrapper/commit/57c487a0284b1ce7c7a7938d16498b894b9b457b))


### 0.6.1 (2015-01-06)


#### Bug Fixes

* **package:** update loader-systemjs to latest version ([09131833](http://github.com/aurelia/bootstrapper/commit/09131833c0fde8689f0261e57df31e736a481253))


## 0.6.0 (2015-01-06)


#### Bug Fixes

* **bootstrapper:** ensure di is available as top level import ([3f50f876](http://github.com/aurelia/bootstrapper/commit/3f50f876943ca7b75511c8542ab2bde039bf4597))


#### Features

* **bootstrapper:**
  * switch router and resources over to plugin model ([aa93bce4](http://github.com/aurelia/bootstrapper/commit/aa93bce4e8ebf20e01128d2ce2a63201d6947c73))
  * switch to core-js ([166c13d6](http://github.com/aurelia/bootstrapper/commit/166c13d6d8bbf86a7206be00566ded34ef9ab17d))
  * add plugin helper for event aggregator ([6df89100](http://github.com/aurelia/bootstrapper/commit/6df8910076c8c164cceffd4a402ec7439e892edf))
  * add plugin helper for binding language ([82a86ffc](http://github.com/aurelia/bootstrapper/commit/82a86ffcca2b3c0a3a23305e51d327244c0c5e19))
  * add plugin helpers for router and resources ([fcb3ac34](http://github.com/aurelia/bootstrapper/commit/fcb3ac340cdf02e2ea6ad6089cac2a061d8ea1cd))
* **build:** update compiler and switch to register module format ([b5619c13](http://github.com/aurelia/bootstrapper/commit/b5619c13ffd57f8e93741e98c8522c45ea4b381c))


### 0.5.2 (2014-12-22)


#### Bug Fixes

* **package:** update dependencies to latest ([ba1a63db](http://github.com/aurelia/bootstrapper/commit/ba1a63db7c47487b8f720c4a96fc12d0ce4b8547))


### 0.5.1 (2014-12-22)


#### Bug Fixes

* **package:** update dependencies to latest ([0fecdbc9](http://github.com/aurelia/bootstrapper/commit/0fecdbc95c4a445bb1e3a1ec65a02cc0059cc4e2))


## 0.5.0 (2014-12-22)


#### Bug Fixes

* **bootstrapper:**
  * update setRoot to remove transition ([98cea82e](http://github.com/aurelia/bootstrapper/commit/98cea82ec63a142c9f364b60cf56a5881a05f888))
  * ensure that aurelia-logging-console is available ([53ef67d0](http://github.com/aurelia/bootstrapper/commit/53ef67d0eebacd7c71c78fcfcf8251906b12da14))
* **package:** update dependencies to latest ([21c8d229](http://github.com/aurelia/bootstrapper/commit/21c8d2293fa3fa8e79d6c5e8dd36ef4760da8a9e))


### 0.4.3 (2014-12-18)


#### Bug Fixes

* **package:** update dependencies to latest versions ([7402bbb8](http://github.com/aurelia/bootstrapper/commit/7402bbb89fb6fc7307af7127365eecb9cb84607b))


### 0.4.2 (2014-12-18)


#### Bug Fixes

* **package:** update dependencies to latest versions ([06ede457](http://github.com/aurelia/bootstrapper/commit/06ede457f36f9347d7016905197d7b44006ae78c))


### 0.4.1 (2014-12-17)


#### Bug Fixes

* **package:** update dependencies to latest versions ([1a6ecd09](http://github.com/aurelia/bootstrapper/commit/1a6ecd0999c693ef37d64529670b0274e996af23))


## 0.4.0 (2014-12-17)


#### Bug Fixes

* **bootstrapper:** invalid loader name ([562b17b3](http://github.com/aurelia/bootstrapper/commit/562b17b3f98cd52d56b3c6c73edc8b67f1dd8f9d))
* **package:** update dependencies to latest versions ([1cb2d30e](http://github.com/aurelia/bootstrapper/commit/1cb2d30e4d75b6a59132cf607a345aaad496ff9f))


### 0.3.1 (2014-12-12)


#### Bug Fixes

* **bootstrapped:** bad import name for RouterView ([6590f2cf](http://github.com/aurelia/bootstrapper/commit/6590f2cf772d493763d0deac81647282d02edc1a))


## 0.3.0 (2014-12-12)


#### Bug Fixes

* **package:** update dependencies to latest versions ([24d6d675](http://github.com/aurelia/bootstrapper/commit/24d6d6751086da93d2f00201bdf4afe7f2ad5423))


#### Features

* **polyfills:** automatically detect and load polyfills as needed ([f57132c8](http://github.com/aurelia/bootstrapper/commit/f57132c8849b626e95fd7546b10ae6cdb6b65a93))


## 0.2.0 (2014-12-11)


#### Bug Fixes

* **package:** update dependencies to latest versions ([70c91a0c](http://github.com/aurelia/bootstrapper/commit/70c91a0c8dc514119b3bf7021c1b0d6e7960d054))

