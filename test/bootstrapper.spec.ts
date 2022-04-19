import { Aurelia, PLATFORM } from 'aurelia-framework';
import { initialize } from 'aurelia-pal-browser';

initialize();

describe('bootstrapper', () => {
  let bootstrap: typeof import('../src/aurelia-bootstrapper').bootstrap;

  beforeEach(async () => {
    PLATFORM.Loader = class {
      normalize(a: string) { return Promise.resolve(a); }
      map(a: string) { return Promise.resolve(a); }
      loadModule(name: string) {
        return name === 'aurelia-framework'
          ? import('aurelia-framework')
          : Promise.reject(new Error('unexpected module name'));
      }
    };

    await import('../src/aurelia-bootstrapper').then(b => bootstrap = b.bootstrap);
  });

  it('should creates an aurelia instance', async () => {
    PLATFORM.Loader = class {
      normalize(a: string) { return a; }
    };

    let aurelia: Aurelia;
    await bootstrap(au => {
      aurelia = au;
    });

    expect(aurelia).toBeInstanceOf(Aurelia);
  });

  it('should creates different aurelia instances', async () => {
    let aurelias: Aurelia[] = [];
    await Promise.all([
      bootstrap(au => { aurelias.push(au); }),
      bootstrap(au => { aurelias.push(au); }),
    ]);

    expect(aurelias.every(au => au instanceof Aurelia)).toBe(true);
    expect(aurelias.length).toBe(2);
    expect(aurelias[0]).not.toBe(aurelias[1]);
  });
});
