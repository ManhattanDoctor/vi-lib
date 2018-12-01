import { Injector, NgModule } from '@angular/core';
import { COOKIE_OPTIONS, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { ThemeAssetBackgroundDirective } from './directive/ThemeAssetBackgroundDirective';
import { ThemeAssetDirective } from './directive/ThemeAssetDirective';
import { ThemeImageDirective } from './directive/ThemeImageDirective';
import { ThemeToggleDirective } from './directive/ThemeToggleDirective';
import { ThemeService } from './service/ThemeService';

@NgModule({
    providers: [
        ThemeService,
        { provide: COOKIE_OPTIONS, useValue: {} },
        { provide: CookieOptionsProvider, useClass: CookieOptionsProvider, deps: [COOKIE_OPTIONS, Injector] },
        { provide: CookieService, useClass: CookieService, deps: [CookieOptionsProvider] }
    ],
    declarations: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective],
    exports: [ThemeAssetDirective, ThemeImageDirective, ThemeToggleDirective, ThemeAssetBackgroundDirective]
})
export class ThemeModule {}
