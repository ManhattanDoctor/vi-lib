import { PipeTransform } from '@angular/core';
import { Moment } from 'moment';
export declare class MomentDatePipe implements PipeTransform {
    static DEFAULT_FORMAT: string;
    transform(value: Date | Moment, format?: string): string;
    fromNow(value: Date | Moment, format?: string, isNeedCapitalize?: boolean): string;
    constructor();
}
