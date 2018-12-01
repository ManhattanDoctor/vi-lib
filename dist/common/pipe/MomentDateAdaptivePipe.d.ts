import { PipeTransform } from '@angular/core';
import { Moment } from 'moment';
export declare class MomentDateAdaptivePipe implements PipeTransform {
    static HOUR_FORMAT: string;
    static DAY_FORMAT: string;
    static MONTH_FORMAT: string;
    static YEAR_FORMAT: string;
    transform(value: Date | Moment): string;
    constructor();
}
