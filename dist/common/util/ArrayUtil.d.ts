export declare class ArrayUtil {
    static sort(array: Array<{
        sortIndex: number;
    }>): void;
    private static sortFunction;
    static move(array: Array<any>, oldIndex: number, newIndex: number): void;
    static isEmpty(array: Array<any>): boolean;
    static clear(array: Array<any>): void;
    static remove(array: Array<any>, item: any): boolean;
    static shuffle(array: Array<any>): void;
    static reverse(array: Array<any>): void;
    static removeEmpty(array: Array<any>): void;
    static parseQueryString(queryString: string): any;
}
