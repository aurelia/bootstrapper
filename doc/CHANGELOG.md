<a name="2.3.2"></a>
## [2.3.2](https://github.com/aurelia/bootstrapper/compare/2.3.1...2.3.2) (2019-01-26)


### Bug Fixes

* avoid unnecessary pal loading when pal is already initialized ([429c261](https://github.com/aurelia/bootstrapper/commit/429c261)), closes [aurelia/cli#1019](https://github.com/aurelia/cli/issues/1019)



<a name="2.3.1"></a>
## [2.3.1](https://github.com/aurelia/bootstrapper/compare/2.3.0...2.3.1) (2018-12-01)


### Bug Fixes

* **loader:** Use better detection of amd loaders ([1b98576](https://github.com/aurelia/bootstrapper/commit/1b98576))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/aurelia/bootstrapper/compare/2.2.0...2.3.0) (2018-07-02)



<a name="2.1.1"></a>
## [2.1.1](https://github.com/aurelia/bootstrapper/compare/2.1.0...v2.1.1) (2017-03-06)


### Bug Fixes

* **Edge:** Chakra/Edge bug when using ES2015 ([9d0917b](https://github.com/aurelia/bootstrapper/commit/9d0917b))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/aurelia/bootstrapper/compare/2.0.1...v2.1.0) (2017-03-01)


### Bug Fixes

* **startup:** starting promise fullfils too early ([020e851](https://github.com/aurelia/bootstrapper/commit/020e851))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/aurelia/bootstrapper/compare/2.0.0...v2.0.1) (2016-12-14)

### Bug Fixes

* Properly detect NWJS

<a name="2.0.0"></a>
# [2.0.0](https://github.com/aurelia/bootstrapper/compare/1.0.1...v2.0.0) (2016-12-08)


### Bug Fixes

* **index:** do not fail when process is polyfilled by Webpack ([7ba0654](https://github.com/aurelia/bootstrapper/commit/7ba0654))
* **index:** do not trip up on NodeJS if PAL was previously initialized ([c70321d](https://github.com/aurelia/bootstrapper/commit/c70321d))
* **index:** higher quality checks for SystemJS and AMD ([71a91f2](https://github.com/aurelia/bootstrapper/commit/71a91f2))
* **index:** ready when no document (not initialized on NodeJS) ([44b0e55](https://github.com/aurelia/bootstrapper/commit/44b0e55))
* **index:** use module.require for node to trip up webpack's parser ([46830fa](https://github.com/aurelia/bootstrapper/commit/46830fa))
* **index:** use webpack require to hide from amd ([cdaa0f2](https://github.com/aurelia/bootstrapper/commit/cdaa0f2))


### Features

* **all:** rework the bootstrapper to detect and load the proper pal ([8ba596b](https://github.com/aurelia/bootstrapper/commit/8ba596b))
* **index:** add starting promise export ([1844827](https://github.com/aurelia/bootstrapper/commit/1844827))
* **index:** add support for module loader detection ([438ffde](https://github.com/aurelia/bootstrapper/commit/438ffde))



# [1.0.1]

### Bug Fixes

* **bootstrapper:** Check module function configure before execute it

<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/bootstrapper/compare/1.0.0-rc.1.0.1...v1.0.0) (2016-07-27)



<a name="1.0.0-rc.1.0.1"></a>
# [1.0.0-rc.1.0.1](https://github.com/aurelia/bootstrapper/compare/1.0.0-rc.1.0.0...v1.0.0-rc.1.0.1) (2016-06-30)


### Features

* **index:** pass config module id along to aurelia instance if present ([51a698c](https://github.com/aurelia/bootstrapper/commit/51a698c))



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/bootstrapper/compare/1.0.0-beta.2.0.1...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.1.2.1 (2016-05-10)


### 1.0.0-beta.1.2.0 (2016-03-22)

* Update to Babel 6

### 1.0.0-beta.1.1.4 (2016-03-01)


### 1.0.0-beta.1.1.3 (2016-03-01)


#### Bug Fixes

* **all:** remove core-js ([60ef61a5](http://github.com/aurelia/bootstrapper/commit/60ef61a5f6cd83ce0f29c0b9242ee2aae7a47f8c))


#### Features

* **index:** use aurelia polyfills ([c77c982b](http://github.com/aurelia/bootstrapper/commit/c77c982ba24a01bf3528d887898f0895784d74ca))


### 1.0.0-beta.1.1.2 (2016-02-08)


#### Bug Fixes

* **index:** remove check for localhost ([0f769f4b](http://github.com/aurelia/bootstrapper/commit/0f769f4b88ed96d7a8c4e67181241a5bccb4e881))
* **lint:** fix eslint config ([a25b4b4e](http://github.com/aurelia/bootstrapper/commit/a25b4b4e662b22af8724347ba62d994274171c4f))


### 1.0.0-beta.1.1.0 (2016-01-29)


#### Bug Fixes

* **index:** change loader detection to work in more environments ([9a5c169a](http://github.com/aurelia/bootstrapper/commit/9a5c169afa1d72814c9b04c735b3e448d5e3430f))


#### Features

* **all:** update jspm meta; core-js; aurelia deps ([65079e91](http://github.com/aurelia/bootstrapper/commit/65079e9135576a7a71226034f2af6ed728946e16))


### 1.0.0-beta.1.0.2 (2016-01-08)


#### Bug Fixes

* **index:** compose promises ([75f1a33b](http://github.com/aurelia/bootstrapper/commit/75f1a33be2cc31bee29fc2cfd42989142bcacb18))


### 1.0.0-beta.1.0.1 (2016-01-08)


#### Bug Fixes

* **all:** switch requirejs/system.js check order ([383161e9](http://github.com/aurelia/bootstrapper/commit/383161e933a0b4ecb2d1163a9535307cad6f4379), closes [#26](http://github.com/aurelia/bootstrapper/issues/26))


#### Features

* **all:** switch normalizeSync to normalize api ([35e4b10e](http://github.com/aurelia/bootstrapper/commit/35e4b10e05b4bc2972a85210fb346b9b90e96e50))


### 1.0.0-beta.1 (2015-11-16)


## 0.19.0 (2015-11-10)


## 0.18.0 (2015-10-13)


#### Bug Fixes

* **all:**
  * address issues with incorrect code in the last PR; update to more ES6 syntax ([63a5bea3](http://github.com/aurelia/bootstrapper/commit/63a5bea348fe407af04be28741e15e5aa9db352f))
  * detect fake system and remove core-js dup load ([f135ad39](http://github.com/aurelia/bootstrapper/commit/f135ad39eccb9a5a8e439c09a2354787cedd0fbe))
  * break out the history from the router plugin config ([864cf2c2](http://github.com/aurelia/bootstrapper/commit/864cf2c2d17bb9dd4d6642b7a7544de25e985926))
  * root should default to aurelia-app host when not specified ([ed3b7124](http://github.com/aurelia/bootstrapper/commit/ed3b712483696c73b8202ef51cc191b3c4493f35), closes [#5](http://github.com/aurelia/bootstrapper/issues/5))
  * update to logLevel enum name api change ([64d8edf3](http://github.com/aurelia/bootstrapper/commit/64d8edf355c4caf13fbd02e888a3eaa038ffadf4))
  * use default loader ([8acf5996](http://github.com/aurelia/bootstrapper/commit/8acf599669c59fb9b5625a98dcbc3f7acd5ce45f))
* **bootstrapped:**
  * ensure that templating resources are in System.map ([fb6ad861](http://github.com/aurelia/bootstrapper/commit/fb6ad8615483c7f9dedb017599c4f04bb6135c61))
  * bad import name for RouterView ([6590f2cf](http://github.com/aurelia/bootstrapper/commit/6590f2cf772d493763d0deac81647282d02edc1a))
* **bootstrapper:**
  * remove catch handlers that kill stack traces during startup ([e867ca1f](http://github.com/aurelia/bootstrapper/commit/e867ca1f2c9865e65448c3a5f8074d2711cfe991))
  * removees5-specific helper detection ([d55802b2](http://github.com/aurelia/bootstrapper/commit/d55802b26f44ff7d837bc8fe1a4b05795f58a57d))
  * change how default loader is discovered ([13b04160](http://github.com/aurelia/bootstrapper/commit/13b0416081d1cea542e7b54edb086e6ade977692))
  * ensure di is available as top level import ([3f50f876](http://github.com/aurelia/bootstrapper/commit/3f50f876943ca7b75511c8542ab2bde039bf4597))
  * update setRoot to remove transition ([98cea82e](http://github.com/aurelia/bootstrapper/commit/98cea82ec63a142c9f364b60cf56a5881a05f888))
  * ensure that aurelia-logging-console is available ([53ef67d0](http://github.com/aurelia/bootstrapper/commit/53ef67d0eebacd7c71c78fcfcf8251906b12da14))
  * invalid loader name ([562b17b3](http://github.com/aurelia/bootstrapper/commit/562b17b3f98cd52d56b3c6c73edc8b67f1dd8f9d))
* **build:**
  * missing gulp-rename dep ([3d4bb04d](http://github.com/aurelia/bootstrapper/commit/3d4bb04dad7999744bb38f97ffb80833ff6b0a0e))
  * d.ts generation and doc generation ([43dba2b7](http://github.com/aurelia/bootstrapper/commit/43dba2b71032638aa22897c9dbf64b312be2e1e3))
  * update linting, testing and tools ([b0fcc33b](http://github.com/aurelia/bootstrapper/commit/b0fcc33bfdff3ed4f2ca0032b035385d80457d18))
  * add missing bower bump ([e72cf895](http://github.com/aurelia/bootstrapper/commit/e72cf8957e5ca912dbd9a3c2bc2287050450d258))
* **index:**
  * switch to console when logger not loaded ([145bd3f2](http://github.com/aurelia/bootstrapper/commit/145bd3f2c0a3f5e3cca2d354446329e49204efe4))
  * correct core-js import syntax and fix lint errors ([7831d8f3](http://github.com/aurelia/bootstrapper/commit/7831d8f307f5ec125a015f1e53eeab1e8294e3d6))
  * remove html import polyfill load ([8d99882d](http://github.com/aurelia/bootstrapper/commit/8d99882d6eca2fa16be64cd3798575d697937743))
  * detect System or require api and load appropriately ([2fa4d3e7](http://github.com/aurelia/bootstrapper/commit/2fa4d3e7a6f525912ed1384c6eab33ff34960eb0), closes [#110](http://github.com/aurelia/bootstrapper/issues/110))
* **package:**
  * change jspm directories ([f82ca368](http://github.com/aurelia/bootstrapper/commit/f82ca3689a8b5aa197b22bd804dae0cbfd0cab7a))
  * update dependencies ([f3435bf8](http://github.com/aurelia/bootstrapper/commit/f3435bf8ecf8beff79494e1d68538fa5688379fd))
  * update deps and fix bower semver ranges ([8754ff0e](http://github.com/aurelia/bootstrapper/commit/8754ff0e915780ed14797eadcb43d9dccb60bf11))
  * update dependencies ([a8811da7](http://github.com/aurelia/bootstrapper/commit/a8811da77ecb80ca11b0e7adaec8a76e841517cc))
  * update Aurelia dependencies ([37aeca13](http://github.com/aurelia/bootstrapper/commit/37aeca13b7b14800c6f15f9103ba20c0c0a28ac3))
  * update dependencies to latest ([57c487a0](http://github.com/aurelia/bootstrapper/commit/57c487a0284b1ce7c7a7938d16498b894b9b457b))
  * update loader-systemjs to latest version ([09131833](http://github.com/aurelia/bootstrapper/commit/09131833c0fde8689f0261e57df31e736a481253))
  * update dependencies to latest ([ba1a63db](http://github.com/aurelia/bootstrapper/commit/ba1a63db7c47487b8f720c4a96fc12d0ce4b8547))
  * update dependencies to latest ([0fecdbc9](http://github.com/aurelia/bootstrapper/commit/0fecdbc95c4a445bb1e3a1ec65a02cc0059cc4e2))
  * update dependencies to latest ([21c8d229](http://github.com/aurelia/bootstrapper/commit/21c8d2293fa3fa8e79d6c5e8dd36ef4760da8a9e))
  * update dependencies to latest versions ([7402bbb8](http://github.com/aurelia/bootstrapper/commit/7402bbb89fb6fc7307af7127365eecb9cb84607b))
  * update dependencies to latest versions ([06ede457](http://github.com/aurelia/bootstrapper/commit/06ede457f36f9347d7016905197d7b44006ae78c))
  * update dependencies to latest versions ([1a6ecd09](http://github.com/aurelia/bootstrapper/commit/1a6ecd0999c693ef37d64529670b0274e996af23))
  * update dependencies to latest versions ([1cb2d30e](http://github.com/aurelia/bootstrapper/commit/1cb2d30e4d75b6a59132cf607a345aaad496ff9f))
  * update dependencies to latest versions ([24d6d675](http://github.com/aurelia/bootstrapper/commit/24d6d6751086da93d2f00201bdf4afe7f2ad5423))
  * update dependencies to latest versions ([70c91a0c](http://github.com/aurelia/bootstrapper/commit/70c91a0c8dc514119b3bf7021c1b0d6e7960d054))
* **preparePlatform:** correct spelling ([010f0a9a](http://github.com/aurelia/bootstrapper/commit/010f0a9a25fe9ccd6536fbb1cfd10b9648aa4abc))


#### Features

* **all:**
  * incorporate pal ([3935af79](http://github.com/aurelia/bootstrapper/commit/3935af79a3cff8e1ed44bd7ebb6baa859c0d170e))
  * remove static imports and use new loader apis to remove global System ([67993548](http://github.com/aurelia/bootstrapper/commit/6799354869ea3b8eea1c5d5be2c46c73a00f631f))
  * add more type info ([d593ee59](http://github.com/aurelia/bootstrapper/commit/d593ee596f6c1607393d73d551532386415d6947))
  * remove AtScript support ([65134367](http://github.com/aurelia/bootstrapper/commit/651343677e3d4d8825f065a7bad8d72708ac83b0))
  * update compiler and core-is integration ([52d84e7a](http://github.com/aurelia/bootstrapper/commit/52d84e7a6594304f418da63d47cd734c99bf0afc))
  * update to new plugin api ([50fc5ce6](http://github.com/aurelia/bootstrapper/commit/50fc5ce6f56bd24f3dbbc66a7f5aa0b93f7cbfed))
* **bootstrapped:** switch router and resources over to plugin model ([aa93bce4](http://github.com/aurelia/bootstrapper/commit/aa93bce4e8ebf20e01128d2ce2a63201d6947c73))
* **bootstrapper:**
  * new startup logic ([373bf740](http://github.com/aurelia/bootstrapper/commit/373bf740da2cffbeb33a652dd538ec1f1ce2f4c7))
  * identify polyfilled system and skip core-js ([76fab9a1](http://github.com/aurelia/bootstrapper/commit/76fab9a153ac71ff78e6d6e5a544b8df05041a5e))
  * switch to core-js ([166c13d6](http://github.com/aurelia/bootstrapper/commit/166c13d6d8bbf86a7206be00566ded34ef9ab17d))
  * add plugin helper for event aggregator ([6df89100](http://github.com/aurelia/bootstrapper/commit/6df8910076c8c164cceffd4a402ec7439e892edf))
  * add plugin helper for binding language ([82a86ffc](http://github.com/aurelia/bootstrapper/commit/82a86ffcca2b3c0a3a23305e51d327244c0c5e19))
  * add plugin helpers for router and resources ([fcb3ac34](http://github.com/aurelia/bootstrapper/commit/fcb3ac340cdf02e2ea6ad6089cac2a061d8ea1cd))
* **build:** update compiler and switch to register module format ([b5619c13](http://github.com/aurelia/bootstrapper/commit/b5619c13ffd57f8e93741e98c8522c45ea4b381c))
* **index:** removed some code that was relocated to aurelia itself ([17ca281d](http://github.com/aurelia/bootstrapper/commit/17ca281d823dc4aa3a22af885e179d83ef6361e1))
* **polyfills:** automatically detect and load polyfills as needed ([f57132c8](http://github.com/aurelia/bootstrapper/commit/f57132c8849b626e95fd7546b10ae6cdb6b65a93))


## 0.17.0 (2015-09-05)


#### Bug Fixes

* **all:** address issues with incorrect code in the last PR; update to more ES6 syntax ([63a5bea3](http://github.com/aurelia/bootstrapper/commit/63a5bea348fe407af04be28741e15e5aa9db352f))
* **build:**
  * d.ts generation and doc generation ([43dba2b7](http://github.com/aurelia/bootstrapper/commit/43dba2b71032638aa22897c9dbf64b312be2e1e3))
  * update linting, testing and tools ([b0fcc33b](http://github.com/aurelia/bootstrapper/commit/b0fcc33bfdff3ed4f2ca0032b035385d80457d18))
* **index:** remove html import polyfill load ([8d99882d](http://github.com/aurelia/bootstrapper/commit/8d99882d6eca2fa16be64cd3798575d697937743))


## 0.16.0 (2015-08-14)


#### Features

* **all:** add more type info ([d593ee59](http://github.com/aurelia/bootstrapper/commit/d593ee596f6c1607393d73d551532386415d6947))


## 0.15.0 (2015-08-05)


#### Features

* **index:** removed some code that was relocated to aurelia itself ([17ca281d](http://github.com/aurelia/bootstrapper/commit/17ca281d823dc4aa3a22af885e179d83ef6361e1))


### 0.14.1 (2015-07-29)

* improve output file name

## 0.14.0 (2015-07-02)


#### Bug Fixes

* **all:** detect fake system and remove core-js dup load ([f135ad39](http://github.com/aurelia/bootstrapper/commit/f135ad39eccb9a5a8e439c09a2354787cedd0fbe))


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
