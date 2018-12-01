import { TranslateParser } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ObservableData } from '../../common/observer/ObservableData';
import { LanguageServiceEvent } from '../service/LanguageService';
export declare class LanguageMessageFormatParser extends TranslateParser {
    private _locale;
    private formatter;
    private lastKey;
    private formatters;
    private translations;
    private observer;
    constructor();
    private getKey;
    private getFormatter;
    compile(text: string, params?: any): string;
    interpolate(expression: string, params?: any): string;
    getValue(target: any, key: string): string;
    readonly events: Observable<ObservableData<LanguageServiceEvent, Error>>;
    locale: string;
}
