var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { COOKIE_OPTIONS, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { LanguageMatPaginatorIntl } from './service/LanguageMatPaginatorIntl';
import { LanguageService } from './service/LanguageService';
var LanguageModule = (function () {
    function LanguageModule() {
    }
    LanguageModule = __decorate([
        NgModule({
            imports: [HttpClientModule, LanguageService.forRoot()],
            providers: [
                LanguageService,
                LanguageMatPaginatorIntl,
                { provide: COOKIE_OPTIONS, useValue: {} },
                { provide: CookieOptionsProvider, useClass: CookieOptionsProvider, deps: [COOKIE_OPTIONS, Injector] },
                { provide: CookieService, useClass: CookieService, deps: [CookieOptionsProvider] }
            ],
            exports: [TranslateModule]
        })
    ], LanguageModule);
    return LanguageModule;
}());
export { LanguageModule };
//# sourceMappingURL=../../src/language/LanguageModule.js.map