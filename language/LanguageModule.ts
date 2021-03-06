import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MissingTranslationHandler, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { LanguageResolver } from '@vi-lib/common/resolver/LanguageResolver';
import { CookieModule } from 'ngx-cookie';
import { LanguageMessageFormatParser } from './lib/LanguageMessageFormatParser';
import { LanguageMatPaginatorIntl } from './service/LanguageMatPaginatorIntl';
import { LanguageMissingTranslationHandler } from './lib/LanguageMissingTranslationHandler';
import { LanguageService } from './service/LanguageService';

export let imports: Array<any> = [
    HttpClientModule,
    TranslateModule.forRoot({
        parser: {
            provide: TranslateParser,
            useClass: LanguageMessageFormatParser
        },
        missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useClass: LanguageMissingTranslationHandler
        }
    }),
    CookieModule.forRoot()
];
export const exports: Array<any> = [TranslateModule];

@NgModule({
    imports,
    exports
})
export class LanguageModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: LanguageModule,
            providers: [LanguageService, LanguageResolver, LanguageMatPaginatorIntl]
        };
    }
}
