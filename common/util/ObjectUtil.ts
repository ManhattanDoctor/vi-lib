export class ObjectUtil {
    // --------------------------------------------------------------------------
    //
    //  Check Methods
    //
    // --------------------------------------------------------------------------

    public static isBoolean(data: any): boolean {
        return typeof data === 'boolean';
    }

    public static isFunction(data: any): boolean {
        return typeof data === 'function';
    }

    public static isNumber(data: any): boolean {
        return typeof data === 'number' && !isNaN(data);
    }

    public static isString(data: any): boolean {
        return typeof data === 'string';
    }

    public static isStringBoolean(data: any): boolean {
        return ObjectUtil.isString(data) && (data === 'true' || data === 'false');
    }

    public static isObject(data: any): boolean {
        return typeof data === 'object';
    }
    public static isArray(data: any): boolean {
        return Array.isArray(data);
    }

    public static isEmpty(data: any): boolean {
        if (ObjectUtil.isNullOrUndefined(data)) {
            return true;
        }
        if (ObjectUtil.isArray(data)) {
            return data.length === 0;
        }
        if (ObjectUtil.isObject(data)) {
            return ObjectUtil.keys(data).length === 0;
        }
        data = data.toString();
        return data === 'null' || data === 'undefined' || data.length === 0;
    }

    public static isNullOrUndefined(data: any): boolean {
        return data === null || data === undefined;
    }

    // --------------------------------------------------------------------------
    //
    //  Object Methods
    //
    // --------------------------------------------------------------------------

    public static instanceOf(data: any, properties: Array<string>): boolean {
        if (ObjectUtil.isNullOrUndefined(data) || ObjectUtil.isBoolean(data) || data !== Object(data)) {
            return false;
        }
        for (let name of properties) {
            if (!(name in data)) {
                return false;
            }
        }
        return true;
    }

    public static hasOwnProperty(data: any, property: string): boolean {
        return !ObjectUtil.isNullOrUndefined(data) ? Object.getOwnPropertyNames(data).includes(property) : false;
    }

    public static clear(data: any): void {
        if (!ObjectUtil.isObject(data)) {
            return;
        }
        for (let key of ObjectUtil.keys(data)) {
            delete data[key];
        }
    }

    public static keys<U, V extends keyof U>(from: U): Array<V> {
        return Object.getOwnPropertyNames(from) as any;
    }

    public static copyProperties<U, V extends keyof U>(from: U, to: any, includeKeys?: Array<V>, excludeKeys?: Array<V>): any {
        if (ObjectUtil.isNullOrUndefined(from) || ObjectUtil.isNullOrUndefined(to)) {
            return null;
        }

        if (!includeKeys || includeKeys.length === 0) {
            includeKeys = ObjectUtil.keys(from);
        }

        for (let key of includeKeys) {
            if (excludeKeys && excludeKeys.length > 0 && excludeKeys.includes(key)) {
                continue;
            }
            try {
                to[key] = from[key];
            } catch (error) {}
        }
        return to;
    }

    // --------------------------------------------------------------------------
    //
    //  Crypto Methods
    //
    // --------------------------------------------------------------------------

    public static sortKeys(data: any): any {
        if (ObjectUtil.isNullOrUndefined(data)) {
            return;
        }
        if (!ObjectUtil.isObject(data)) {
            return data.toString();
        }

        let keys = Object.keys(data);
        if (keys.length === 0) {
            return data.toString();
        }

        keys.sort();
        let item = {};
        for (let key of keys) {
            item[key] = data[key];
        }
        return item;
    }
}
