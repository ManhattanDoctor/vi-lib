import { HttpParams } from '@angular/common/http';
export declare class UrlUtil {
    private static ABSOLUTE_URL_EXP;
    private static TAG_REG_EXP;
    private static IMAGE_REG_EXP;
    static parseUrl(value: any): string;
    static convertToParams(param: any): HttpParams;
    static convertLinks(text: string, options?: any): string;
    static isImageUrl(url: string): boolean;
    static isAbsoluteUrl(url: string): boolean;
    static removeTags(text: string): string;
}
