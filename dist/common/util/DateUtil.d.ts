export declare class DateUtil {
    static MILISECONDS_YEAR: number;
    static MILISECONDS_MONTH: number;
    static MILISECONDS_DAY: number;
    static MILISECONDS_HOUR: number;
    static MILISECONDS_MINUTE: number;
    static MILISECONDS_SECOND: number;
    private static serverDateTime;
    private static serverDateUpdateTime;
    static getTime(value: any): number;
    static getDate(time: number): Date;
    static parseDate(value: any): Date;
    isEqual(first: Date, second: Date): boolean;
    static isUnknown(date: any): boolean;
    static readonly serverTime: number;
    static readonly serverDate: Date;
    static updateServerDate(date: Date): void;
    static getTimeLeft(date: Date): number;
}
