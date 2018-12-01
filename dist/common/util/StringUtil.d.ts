export declare class StringUtil {
    static truncate(text: string, maxLength?: number): string;
    static isEmpty(value: any): boolean;
    static isContains(text: string, value: string, isCaseSensitive?: boolean): boolean;
    static isEquals(text: string, value: string, isCaseSensitive?: boolean): boolean;
    static capitalizeFirstLetter(text: string): string;
    static lowerizeFirstLetter(text: string): string;
    static toHexColor(value: string): string;
}
