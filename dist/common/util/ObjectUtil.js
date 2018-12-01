var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    ObjectUtil.isSpecificValue = function (val) {
        return val instanceof Buffer || val instanceof Date || val instanceof RegExp;
    };
    ObjectUtil.cloneSpecificValue = function (val) {
        if (val instanceof Buffer) {
            var x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
            val.copy(x);
            return x;
        }
        else if (val instanceof Date) {
            return new Date(val.getTime());
        }
        else if (val instanceof RegExp) {
            return new RegExp(val);
        }
        else {
            throw new Error('Unexpected situation');
        }
    };
    ObjectUtil.safeGetProperty = function (object, property) {
        return property === '__proto__' ? undefined : object[property];
    };
    ObjectUtil.deepCloneArray = function (arr) {
        var clone = [];
        arr.forEach(function (item, index) {
            if (typeof item === 'object' && item !== null) {
                if (Array.isArray(item)) {
                    clone[index] = ObjectUtil.deepCloneArray(item);
                }
                else if (ObjectUtil.isSpecificValue(item)) {
                    clone[index] = ObjectUtil.cloneSpecificValue(item);
                }
                else {
                    clone[index] = ObjectUtil.deepExtend({}, item);
                }
            }
            else {
                clone[index] = item;
            }
        });
        return clone;
    };
    ObjectUtil.deepExtend = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (arguments.length < 1 || typeof arguments[0] !== 'object')
            return false;
        if (arguments.length < 2)
            return arguments[0];
        var target = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var val, src, clone;
        args.forEach(function (obj) {
            if (typeof obj !== 'object' || obj === null || Array.isArray(obj))
                return;
            Object.keys(obj).forEach(function (key) {
                src = ObjectUtil.safeGetProperty(target, key);
                val = ObjectUtil.safeGetProperty(obj, key);
                if (val === target) {
                    return;
                }
                else if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    return;
                }
                else if (Array.isArray(val)) {
                    target[key] = ObjectUtil.deepCloneArray(val);
                    return;
                }
                else if (ObjectUtil.isSpecificValue(val)) {
                    target[key] = ObjectUtil.cloneSpecificValue(val);
                    return;
                }
                else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                    target[key] = ObjectUtil.deepExtend({}, val);
                    return;
                }
                else {
                    target[key] = ObjectUtil.deepExtend(src, val);
                    return;
                }
            });
        });
        return target;
    };
    return ObjectUtil;
}());
export { ObjectUtil };
//# sourceMappingURL=../../../src/common/util/ObjectUtil.js.map