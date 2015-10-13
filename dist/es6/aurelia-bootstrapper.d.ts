declare module 'aurelia-bootstrapper' {
  import 'core-js';
  import { PLATFORM }  from 'aurelia-pal';
  import { initialize }  from 'aurelia-pal-browser';
  export function bootstrap(configure: Function): Promise<void>;
}