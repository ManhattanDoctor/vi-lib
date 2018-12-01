import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Pipe({
    name: 'formatMomentAdaptiveDate'
})
export class MomentDateAdaptivePipe implements PipeTransform {
    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    public static HOUR_FORMAT = 'HH:ss';
    public static DAY_FORMAT = 'DD MMM HH:ss';
    public static MONTH_FORMAT = 'DD MMM HH:ss';
    public static YEAR_FORMAT = 'LLL';

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public transform(value: Date | Moment): string {
        if (!value) return '---';

        let item: Moment = null;
        if (value instanceof Date) item = moment(value);
        else item = value as Moment;

        let now = moment();
        let duration = moment.duration(now.diff(item));

        let format = null;
        if (Math.abs(duration.asYears()) >= 1) format = MomentDateAdaptivePipe.YEAR_FORMAT;
        else if (Math.abs(duration.asMonths()) >= 1) format = MomentDateAdaptivePipe.MONTH_FORMAT;
        else if (Math.abs(duration.asDays()) >= 1) format = MomentDateAdaptivePipe.DAY_FORMAT;
        else format = MomentDateAdaptivePipe.HOUR_FORMAT;

        return item.format(format);
    }

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {}
}
