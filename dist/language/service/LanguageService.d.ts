import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Loadable } from '../../common/lib/Loadable';
import { MapCollection } from '../../common/map/MapCollection';
import { Language } from '../lib/Language';
export declare class LanguageService extends Loadable<LanguageServiceEvent, Language> {
    private http;
    private cookies;
    private translation;
    static forRoot(): ModuleWithProviders;
    private url;
    private isInitialized;
    private defaultLanguage;
    private _language;
    private _rawTranslationData;
    private _availableLanguages;
    private parser;
    private subscription;
    constructor(http: HttpClient, cookies: CookieService, translation: TranslateService);
    static createTranslateAuthorProperties(user: any, properties?: any): any;
    static createTranslateReceiverProperties(user: any, properties?: any): any;
    private loadLanguage;
    private setLanguage;
    load(value?: string | Language): void;
    translate(key: string, params?: Object): string;
    compile(text: string, params: Object): string;
    hasTranslation(key: string, params?: Object): boolean;
    initialize(url: string, availableLanguages: Map<string, string>, defaultLanguage: string): void;
    getLanguageUrl(language: Language): string;
    getCustomLanguageUrl(language: Language): string;
    getRawTranslationData(): any;
    readonly locale: string;
    readonly defaultLocale: string;
    readonly language: Language;
    readonly availableLanguages: MapCollection<Language>;
}
export declare enum LanguageServiceEvent {
    PARSE_ERROR = "PARSE_ERROR"
}
