import { StringUtil } from './StringUtil';
var RandomUtil = (function () {
    function RandomUtil() {
    }
    RandomUtil.randomColor = function () {
        return Math.random() * 0xffffff;
    };
    RandomUtil.randomBoolean = function () {
        return Math.random() >= 0.5;
    };
    RandomUtil.randomUrl = function (url) {
        if (StringUtil.isEmpty(url))
            return url;
        var value = url.includes('?') ? '&' : '?';
        value += 'rnd=' + RandomUtil.randomString(10) + RandomUtil.randomNumber(0, 1000000);
        return url + value;
    };
    RandomUtil.randomString = function (length) {
        if (length === void 0) { length = 10; }
        var value = '';
        var maxLength = RandomUtil.RANDOM_STRING_VALUES.length;
        for (var i = 0; i < length; i++)
            value += RandomUtil.RANDOM_STRING_VALUES.charAt(RandomUtil.randomNumber(0, maxLength - 1));
        return value;
    };
    RandomUtil.randomDate = function (start, finish) {
        return new Date(start.getTime() + Math.random() * (finish.getTime() - start.getTime()));
    };
    RandomUtil.randomNumber = function (min, max) {
        if (min === void 0) { min = NaN; }
        if (max === void 0) { max = NaN; }
        if (isNaN(min))
            min = 0;
        if (isNaN(max))
            max = Number.MAX_VALUE - 1;
        return Math.round(Math.random() * (max - min)) + min;
    };
    RandomUtil.randomArrayIndex = function (array) {
        return RandomUtil.randomNumber(0, array.length - 1);
    };
    RandomUtil.randomArrayItem = function (array) {
        return array[RandomUtil.randomArrayIndex(array)];
    };
    RandomUtil.randomKey = function (object) {
        var keys = Object.keys(object);
        var randomKeyIndex = RandomUtil.randomNumber(0, keys.length - 1);
        return keys[randomKeyIndex];
    };
    RandomUtil.RANDOM_STRING_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return RandomUtil;
}());
export { RandomUtil };
//# sourceMappingURL=../../../src/common/util/RandomUtil.js.map