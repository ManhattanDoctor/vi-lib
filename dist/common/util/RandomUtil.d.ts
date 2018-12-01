export declare class RandomUtil {
    private static RANDOM_STRING_VALUES;
    static randomColor(): number;
    static randomBoolean(): boolean;
    static randomUrl(url: string): string;
    static randomString(length?: number): string;
    static randomDate(start: Date, finish: Date): Date;
    static randomNumber(min?: number, max?: number): number;
    static randomArrayIndex(array: Array<any>): number;
    static randomArrayItem(array: Array<any>): any;
    static randomKey(object: any): any;
}
