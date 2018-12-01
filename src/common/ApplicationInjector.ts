import { Injector } from '@angular/core';

let applicationInjector: Injector;

export const APPLICATION_INJECTOR = (injector?: Injector): Injector => {
    if (injector) applicationInjector = injector;
    return applicationInjector;
};
