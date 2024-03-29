// Generated by dts-bundle-generator v6.7.0

import { Aurelia } from 'aurelia-framework';

/**
 * Manually bootstraps an application.
 * @param configure A callback which passes an Aurelia instance to the developer to manually configure and start up the app.
 * @return A Promise that completes when configuration is done.
 */
export declare function bootstrap(configure: (aurelia: Aurelia) => any): Promise<void>;
export declare function bootstrap(configure: Function): Promise<void>;
/**
 * A promise that represents the bootstrapper's startup process.
 * It resolves when the process has finished starting.
 */
export declare const starting: Promise<any[]>;

export {};
