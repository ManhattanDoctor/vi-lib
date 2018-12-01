var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injector, NgModule } from '@angular/core';
import { COOKIE_OPTIONS, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { ThemeAssetBackgroundDirective } from './directive/ThemeAssetBackgroundDirective';
import { ThemeAssetDirective } from './directive/ThemeAssetDirective';
import { ThemeImageDirective } from './directive/ThemeImageDirective';
import { ThemeToggleDirective } from './directive/ThemeToggleDirective';
import { ThemeService } from './service/ThemeService';
var ThemeModule = (function () {
    function ThemeModule() {
    }
    ThemeModule = __decorate([
        NgModule({
            providers: [
                ThemeService,
                { provide: COOKIE_OPTIONS, useValue: {} },
                { provide: CookieOptionsProvider, useClass: CookieOptionsProvider, deps: [COOKIE_OPTIONS, Injector] },
                { provide: CookieService, useClass: CookieService, deps: [CookieOptionsProvider] }
            ],
            declarations: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective],
            exports: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective]
        })
    ], ThemeModule);
    return ThemeModule;
}());
export { ThemeModule };
//# sourceMappingURL=../../src/theme/ThemeModule.js.map