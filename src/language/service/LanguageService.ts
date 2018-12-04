import { HttpClient } from '@angular/common/http';
import { Injectable, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';
import { Loadable, LoadableEvent, LoadableStatus } from '../../common/lib/Loadable';
import { MapCollection } from '../../common/map/MapCollection';
import { ObservableData } from '../../common/observer/ObservableData';
import { ObjectUtil } from '../../common/util/ObjectUtil';
import { Language } from '../lib/Language';
import { LanguageMessageFormatParser } from '../lib/LanguageMessageFormatParser';

@Injectable()
export class LanguageService extends Loadable<LanguageServiceEvent, Language> {

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private url: string;
    private isInitialized: boolean;
    private defaultLanguage: Language;

    private _language: Language;
    private _rawTranslationData: any;
    private _availableLanguages: MapCollection<Language>;

    private parser: LanguageMessageFormatParser;

    private subscription: Subscription;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private http: HttpClient, private cookies: CookieService, private translation: TranslateService) {
        super();
        this._availableLanguages = new MapCollection<Language>();

        this.parser = translation.parser as LanguageMessageFormatParser;
        this.parser.events.subscribe(data => {
            if (data.type === LanguageServiceEvent.PARSE_ERROR) console.log('Language parse error: ' + data.data);
            // this.observer.next(new ObservableData(LanguageServiceEvent.PARSE_ERROR,data.data));
        });
    }

    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static createTranslateAuthorProperties(user: any, properties: any = null): any {
        if (!properties) properties = {};

        if (user) {
            properties.authorId = user.id;
            properties.authorName = user.name;
            properties.authorMale = user.isMale;
            properties.authorPicture = user.picture;
            properties.authorClass = user.isMale ? 'male' : 'female';
        }

        return properties;
    }

    public static createTranslateReceiverProperties(user: any, properties: any = null): any {
        if (!properties) properties = {};

        if (user) {
            properties.receiverId = user.id;
            properties.receiverName = user.name;
            properties.receiverMale = user.isMale;
            properties.receiverPicture = user.picture;
            properties.receiverClass = user.isMale ? 'male' : 'female';
        }

        return properties;
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private loadLanguage(language: Language): void {
        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED, language));

        if (this.subscription) this.subscription.unsubscribe();

        this.subscription = this.http.get(this.getLanguageUrl(language)).subscribe(
            json => {
                this.subscription.unsubscribe();
                this.subscription = this.http.get(this.getCustomLanguageUrl(language)).subscribe(
                    jsonCustom => {
                        let translation = ObjectUtil.deepExtend(json, jsonCustom);
                        this.setLanguage(language, translation);
                    },
                    error => {
                        this.setLanguage(language, json);
                    }
                );
            },
            error => {
                this.status = LoadableStatus.ERROR;
                this.observer.next(new ObservableData(LoadableEvent.ERROR, language, error.error.error));
                this.observer.next(new ObservableData(LoadableEvent.FINISHED, language));
            }
        );
    }

    private setLanguage(language: Language, translation: any): void {
        this._language = language;
        this._rawTranslationData = translation;

        this.cookies.put('language', language.locale);

        this.translation.setTranslation(language.locale, translation);
        this.translation.use(language.locale);
        this.parser.locale = language.locale;

        this.status = LoadableStatus.LOADED;
        this.observer.next(new ObservableData(LoadableEvent.COMPLETE, language));
        this.observer.next(new ObservableData(LoadableEvent.FINISHED, language));
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public load(value?: string | Language): void {
        let locale = value instanceof Language ? value.locale : value;
        if (!locale) locale = this.cookies.get('language');

        if (!locale || !this._availableLanguages.has(locale)) locale = this.defaultLanguage.locale;

        let language = this._availableLanguages.get(locale);
        if (!this.language || !this.language.toEqual(language)) this.loadLanguage(language);
        else this.observer.next(new ObservableData(LoadableEvent.COMPLETE, language));
    }

    public translate(key: string, params?: any): string {
        return this.translation.instant(key, params);
        /*
		try
		{
			return this.translation.instant(key,params);
		}
		catch(error)
		{
			console.log(key);
			return key;
		}
		*/
    }

    public compile(text: string, params: any): string {
        return this.parser.compile(text, params);
    }

    public hasTranslation(key: string, params?: any): boolean {
        return this.translation.instant(key, params) !== key;
    }

    public initialize(url: string, availableLanguages: Map<string, string>, defaultLanguage: string): void {
        if (this.isInitialized) throw new Error('Service already initialized');

        if (!url) throw new Error('Unable to initialize: url is undefined or empty');

        if (!availableLanguages || availableLanguages.size === 0) throw new Error('Unable to initialize: available languages is undefined or empty');

        if (!availableLanguages.has(defaultLanguage))
            throw new Error(`Unable to initialize: default language is undefined or doesn't contain in available languages`);

        this.isInitialized = true;

        this.url = url;
        availableLanguages.forEach((name, locale) => this._availableLanguages.add(new Language(locale, name)));
        this.defaultLanguage = this._availableLanguages.get(defaultLanguage);
    }

    public getLanguageUrl(language: Language): string {
        return this.url + language.locale + '.json';
    }

    public getCustomLanguageUrl(language: Language): string {
        return this.url + language.locale + 'Custom.json';
    }

    public getRawTranslationData(): any {
        return this._rawTranslationData;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get locale(): string {
        return this.language ? this.language.locale : this.defaultLocale;
    }

    public get defaultLocale(): string {
        return this.defaultLanguage ? this.defaultLanguage.locale : null;
    }

    public get language(): Language {
        return this._language;
    }

    public get availableLanguages(): MapCollection<Language> {
        return this._availableLanguages;
    }
}

export enum LanguageServiceEvent {
    PARSE_ERROR = 'PARSE_ERROR'
}
