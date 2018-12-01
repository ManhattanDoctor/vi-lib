export class DateUtil {
    //--------------------------------------------------------------------------
    //
    //	Static Properties
    //
    //--------------------------------------------------------------------------

    public static MILISECONDS_YEAR = 12 * 30 * 24 * 60 * 60 * 1000;
    public static MILISECONDS_MONTH = 30 * 24 * 60 * 60 * 1000;
    public static MILISECONDS_DAY = 24 * 60 * 60 * 1000;
    public static MILISECONDS_HOUR = 60 * 60 * 1000;
    public static MILISECONDS_MINUTE = 60 * 1000;
    public static MILISECONDS_SECOND = 1000;

    private static serverDateTime: number = new Date().getTime();
    private static serverDateUpdateTime: number = new Date().getTime();

    //--------------------------------------------------------------------------
    //
    //	Static Methods
    //
    //--------------------------------------------------------------------------

    public static getTime(value: any): number {
        let date = DateUtil.parseDate(value);
        return date ? date.getTime() : NaN;
    }

    public static getDate(time: number): Date {
        let date = new Date();
        date.setTime(time);
        return date;
    }

    public static parseDate(value: any): Date {
        if (!value) return null;

        if (value instanceof Date) return value;

        let dateNumber = Number(value);
        if (!isNaN(value) && dateNumber) return dateNumber > 0 ? DateUtil.getDate(dateNumber) : null;

        if (value instanceof Array) return value.length == 3 ? new Date(value[2], value[1], value[0]) : null;

        if (typeof value === 'string') return DateUtil.parseDate(value.split('.'));

        return null;
    }

    public isEqual(first: Date, second: Date): boolean {
        if (first == second) return true;

        if ((first === undefined || first === null) && (second === undefined || second === null)) return true;

        if (first && second && first.getTime() == second.getTime()) return true;

        return false;
    }

    public static isUnknown(date): boolean {
        if (date && date.getTime() == 1230757200000) return true;

        return date == null || date == undefined;
    }

    //--------------------------------------------------------------------------
    //
    //	Server Date
    //
    //--------------------------------------------------------------------------

    public static get serverTime(): number {
        return DateUtil.serverDateTime;
    }

    public static get serverDate(): Date {
        let time = new Date().getTime() - DateUtil.serverDateUpdateTime;
        return DateUtil.getDate(DateUtil.serverDateTime + time);
    }

    public static updateServerDate(date: Date): void {
        DateUtil.serverDateTime = date.getTime();
        DateUtil.serverDateUpdateTime = new Date().getTime();
    }

    public static getTimeLeft(date: Date): number {
        return date.getTime() - DateUtil.serverDate.getTime();
    }
}
