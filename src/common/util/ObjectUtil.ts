export class ObjectUtil {
    // --------------------------------------------------------------------------
    //
    // 	Clone Methods
    //
    // --------------------------------------------------------------------------

    public static deepExtend(...params): any {
        if (arguments.length < 1 || typeof arguments[0] !== 'object') {
            return false;
        }

        if (arguments.length < 2) {
            return arguments[0];
        }

        let target = arguments[0];
        let args = Array.prototype.slice.call(arguments, 1);
        let val, src, clone;

        args.forEach(obj => {
            if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return;

            Object.keys(obj).forEach(key => {
                src = ObjectUtil.safeGetProperty(target, key); // source value
                val = ObjectUtil.safeGetProperty(obj, key); // new value

                if (val === target) {
                    return;
                } else if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    return;
                } else if (Array.isArray(val)) {
                    target[key] = ObjectUtil.deepCloneArray(val);
                    return;
                } else if (ObjectUtil.isSpecificValue(val)) {
                    target[key] = ObjectUtil.cloneSpecificValue(val);
                    return;
                } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                    target[key] = ObjectUtil.deepExtend({}, val);
                    return;
                } else {
                    target[key] = ObjectUtil.deepExtend(src, val);
                    return;
                }
            });
        });
        return target;
    }

    private static isSpecificValue(val): boolean {
        return val instanceof Buffer || val instanceof Date || val instanceof RegExp;
    }

    private static cloneSpecificValue(val) {
        if (val instanceof Buffer) {
            let x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
            val.copy(x);
            return x;
        } else if (val instanceof Date) {
            return new Date(val.getTime());
        } else if (val instanceof RegExp) {
            return new RegExp(val);
        } else {
            throw new Error('Unexpected situation');
        }
    }
    private static safeGetProperty(object, property): any {
        return property === '__proto__' ? undefined : object[property];
    }

    private static deepCloneArray(arr: any): any {
        let clone = [];
        arr.forEach((item, index) => {
            if (typeof item === 'object' && item != null) {
                if (Array.isArray(item)) {
                    clone[index] = ObjectUtil.deepCloneArray(item);
                } else if (ObjectUtil.isSpecificValue(item)) {
                    clone[index] = ObjectUtil.cloneSpecificValue(item);
                } else {
                    clone[index] = ObjectUtil.deepExtend({}, item);
                }
            } else {
                clone[index] = item;
            }
        });
        return clone;
    }

    // --------------------------------------------------------------------------
    //
    //  Check Methods
    //
    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    //
    //  Check Methods
    //
    // --------------------------------------------------------------------------

    public static isNumber(data: any): boolean {
        return typeof data === 'number' && !isNaN(data);
    }

    public static isObject(data: any): boolean {
        return typeof data === 'object';
    }

    public static isEmpty(data: any): boolean {
        if (ObjectUtil.isNullOrUndefined(data)) {
            return true;
        }
        if (Array.isArray(data)) {
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
    //  Public Static Methods
    //
    // --------------------------------------------------------------------------

    public static instanceOf(data: any, properties: Array<string>): boolean {
        if (ObjectUtil.isNullOrUndefined(data)) {
            return false;
        }
        for (let name of properties) {
            if (!(name in data)) {
                return false;
            }
        }
        return true;
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
}

declare let Buffer: any;
