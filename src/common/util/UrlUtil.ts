import { HttpParams } from '@angular/common/http';

declare let linkifyStr: any;

export class UrlUtil {
    //--------------------------------------------------------------------------
    //
    //	Static Properties
    //
    //--------------------------------------------------------------------------

    private static ABSOLUTE_URL_EXP = /^https?:\/\//i;
    private static TAG_REG_EXP = /<[^>]*>/gi;
    private static IMAGE_REG_EXP = /(http[s]?:\/\/.*\.(?:png|jpg|jpeg))/i;

    //--------------------------------------------------------------------------
    //
    //	Static Methods
    //
    //--------------------------------------------------------------------------

    public static parseUrl(value: any): string {
        if (!value) return value;

        value = value.toString();
        if (value.substr(-1) != '/') value += '/';
        return value;
    }

    public static convertToParams(param: any): HttpParams {
        if (!param) return null;

        let entries = Object.entries(param);
        if (entries.length == 0) return;

        let value = new HttpParams();
        for (let item of entries) value = value.append(item[0], item[1].toString());
        return value;
    }

    public static convertLinks(text: string, options?: any): string {
        return linkifyStr ? linkifyStr(text, options) : text;
    }

    public static isImageUrl(url: string): boolean {
        return url && url.length > 0 ? UrlUtil.IMAGE_REG_EXP.test(url) : false;
    }

    public static isAbsoluteUrl(url: string): boolean {
        return UrlUtil.ABSOLUTE_URL_EXP.test(url);
    }

    public static removeTags(text: string): string {
        return text.replace(UrlUtil.TAG_REG_EXP, '');
    }
}
