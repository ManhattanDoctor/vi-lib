import { TranslateParser } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ObservableData } from '../../common/observer/ObservableData';
import { LanguageServiceEvent } from '../service/LanguageService';

export class LanguageMessageFormatParser extends TranslateParser {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private _locale: string;
    private formatter: any;

    private lastKey: string;
    private formatters: Map<string, any>;
    private translations: Map<string, string>;

    private observer: Subject<ObservableData<LanguageServiceEvent, Error>>;

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
        this.observer = new Subject();

        this.formatters = new Map();
        this.translations = new Map();
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private getKey(expression: string, params?: any): string {
        let value = expression;
        if (params) value += JSON.stringify(params);
        return value;
    }

    private getFormatter(locale: string): any {
        let value = this.formatters.get(locale);
        if (value) return value;

        try {
            value = new MessageFormat(locale);
        } catch (error) {
            locale = 'en';
            value = this.formatters.get(locale);
            if (!value) value = new MessageFormat(locale);
        }
        return value;
    }

    public compile(text: string, params?: any): string {
        if (!params) params = {};

        let value = this.formatter.compile(text)(params);
        this.translations.set(name, value);
        return value;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public interpolate(expression: string, params?: any): string {
        let key = this.getKey(expression, params);
        let name = this.lastKey;
        let text = this.translations.get(key);

        if (!text && this.formatter) {
            try {
                text = this.compile(expression, params);
            } catch (error) {
                text = name;
                let message = "Error parsing '" + name + "':\n\n" + error.message;
                this.observer.next(new ObservableData(LanguageServiceEvent.PARSE_ERROR, new Error(message)));
            }
        }

        return text;
    }

    public getValue(target: any, key: string): string {
        this.lastKey = key;
        let keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (target && target[key] && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            } else if (!keys.length) {
                target = undefined;
            } else {
                key += '.';
            }
        } while (keys.length);

        return target;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<ObservableData<LanguageServiceEvent, Error>> {
        return this.observer.asObservable();
    }

    public get locale(): string {
        return this._locale;
    }

    public set locale(value: string) {
        if (value == this._locale) return;

        this._locale = value;
        this.translations.clear();

        this.formatter = value ? this.getFormatter(value) : null;
        if (this.formatter) this.formatters.set(this.locale, this.formatter);
    }
}

declare let MessageFormat: any;
