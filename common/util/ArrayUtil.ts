export class ArrayUtil {
    // --------------------------------------------------------------------------
    //
    // 	Private Static Methods
    //
    // --------------------------------------------------------------------------

    public static sort(array: Array<{ sortIndex: number }>): void {
        if (array && array.length > 0) {
            array.sort(ArrayUtil.sortFunction);
        }
    }

    private static sortFunction(first: { sortIndex: number }, second: { sortIndex: number }): number {
        if (!first && !second) {
            return 0;
        }

        if (first && !second) {
            return -1;
        }
        if (!first && second) {
            return 1;
        }
        if (first.sortIndex === second.sortIndex) {
            return 0;
        }
        return first.sortIndex < second.sortIndex ? -1 : 1;
    }

    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static move<U>(array: Array<U>, oldIndex: number, newIndex: number): void {
        if (oldIndex > -1 && newIndex < array.length && oldIndex !== newIndex) {
            array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        }
    }

    public static isEmpty<U>(array: Array<U>): boolean {
        return !array || array.length === 0;
    }

    public static clear<U>(array: Array<U>): void {
        array.splice(0, array.length);
    }

    public static remove<U>(array: Array<U>, item: any): boolean {
        let index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return index > -1;
    }

    public static shuffle<U>(array: Array<U>): void {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    public static reverse<U>(array: Array<U>): void {
        array.reverse();
    }

    public static removeEmpty<U>(array: Array<U>): void {
        for (let i = array.length - 1; i > -1; i--) {
            let value = array[i];
            if (!value || value.toString().trim().length === 0) {
                array.splice(i, 1);
            }
        }
    }

    public static parseQueryString(queryString: string): any {
        let result = {};
        let decoded = '';
        try {
            decoded = decodeURIComponent(queryString);
        } catch (error) {
            return result;
        }

        if (!decoded.length) {
            return result;
        }

        let params: any = decoded.split('?');
        if (params.length === 1) {
            return result;
        }

        params = params[1];
        params = params.split('&');
        for (let pair of params) {
            let sepIndex = pair.indexOf('=');
            if (sepIndex !== -1) {
                let name = pair.substr(0, sepIndex);
                result[name] = pair.substr(sepIndex + 1);
            } else {
                result[pair] = '';
            }
        }

        return result;
    }
}
