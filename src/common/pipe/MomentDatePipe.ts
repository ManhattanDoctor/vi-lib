import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { StringUtil } from '../util/StringUtil';

@Pipe({
    name: 'formatMomentDate'
})
export class MomentDatePipe implements PipeTransform {
    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    public static DEFAULT_FORMAT = 'LLL';

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public transform(value: Date | Moment, format?: string): string {
        if (!value) return null;

        let item: Moment = null;
        if (value instanceof Date) item = moment(value);
        else item = value as Moment;

        return item.format(format || MomentDatePipe.DEFAULT_FORMAT);
    }

    public fromNow(value: Date | Moment, format: string = 'LLL', isNeedCapitalize: boolean = true): string {
        if (!value) return null;

        let item: Moment = null;
        if (value instanceof Date) item = moment(value);
        else item = value as Moment;

        let date = item.fromNow();
        if (format) date += ' (' + item.format(format) + ')';
        return isNeedCapitalize ? StringUtil.capitalizeFirstLetter(date) : date;
    }

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {}
}
