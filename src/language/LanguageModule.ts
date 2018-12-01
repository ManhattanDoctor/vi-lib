import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { COOKIE_OPTIONS, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { LanguageMatPaginatorIntl } from './service/LanguageMatPaginatorIntl';
import { LanguageService } from './service/LanguageService';

@NgModule({
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
export class LanguageModule {}
