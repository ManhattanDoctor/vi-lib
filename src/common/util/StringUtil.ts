export class StringUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static truncate(text: string, maxLength: number = 12): string {
        if (!text || isNaN(maxLength) || text.length < maxLength) return text;

        let value = text.substr(0, maxLength - 3);
        return value + '...';
    }

    public static isEmpty(value: any): boolean {
        if (!value) return true;

        return value.toString().trim().length === 0;
    }

    public static isContains(text: string, value: string, isCaseSensitive: boolean = true): boolean {
        if (!value || !text) return false;

        if (!isCaseSensitive) {
            value = value.toLowerCase();
            text = text.toLowerCase();
        }

        return text.indexOf(value) > -1;
    }

    public static isEquals(text: string, value: string, isCaseSensitive: boolean = true): boolean {
        if (!value && !text) return true;

        if (!isCaseSensitive) {
            value = value ? value.toLowerCase() : null;
            text = text ? text.toLowerCase() : null;
        }

        return text === value;
    }

    public static capitalizeFirstLetter(text: string): string {
        if (!text) return null;

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    public static lowerizeFirstLetter(text: string): string {
        if (!text) return null;

        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    /*
    public static toHexColor(value: string): string {
        let hash = 0;
        for (let i = 0; i < value.length; i++) hash = value.charCodeAt(i) + ((hash << 5) - hash);

        let hex = ((hash >> 24) & 0xff).toString(16) + ((hash >> 16) & 0xff).toString(16) + ((hash >> 8) & 0xff).toString(16) + (hash & 0xff).toString(16);
        hex += '000000';
        hex = hex.substring(0, 6);
        return hex;
    }
    */
}
