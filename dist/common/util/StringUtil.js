var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.truncate = function (text, maxLength) {
        if (maxLength === void 0) { maxLength = 12; }
        if (!text || isNaN(maxLength) || text.length < maxLength)
            return text;
        var value = text.substr(0, maxLength - 3);
        return value + '...';
    };
    StringUtil.isEmpty = function (value) {
        if (!value)
            return true;
        return value.toString().trim().length == 0;
    };
    StringUtil.isContains = function (text, value, isCaseSensitive) {
        if (isCaseSensitive === void 0) { isCaseSensitive = true; }
        if (!value || !text)
            return false;
        if (!isCaseSensitive) {
            value = value.toLowerCase();
            text = text.toLowerCase();
        }
        return text.indexOf(value) > -1;
    };
    StringUtil.isEquals = function (text, value, isCaseSensitive) {
        if (isCaseSensitive === void 0) { isCaseSensitive = true; }
        if (!value && !text)
            return true;
        if (!isCaseSensitive) {
            value = value ? value.toLowerCase() : null;
            text = text ? text.toLowerCase() : null;
        }
        return text == value;
    };
    StringUtil.capitalizeFirstLetter = function (text) {
        if (!text)
            return null;
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    StringUtil.lowerizeFirstLetter = function (text) {
        if (!text)
            return null;
        return text.charAt(0).toLowerCase() + text.slice(1);
    };
    StringUtil.toHexColor = function (value) {
        var hash = 0;
        for (var i = 0; i < value.length; i++)
            hash = value.charCodeAt(i) + ((hash << 5) - hash);
        var hex = ((hash >> 24) & 0xff).toString(16) + ((hash >> 16) & 0xff).toString(16) + ((hash >> 8) & 0xff).toString(16) + (hash & 0xff).toString(16);
        hex += '000000';
        hex = hex.substring(0, 6);
        return hex;
    };
    return StringUtil;
}());
export { StringUtil };
//# sourceMappingURL=../../../src/common/util/StringUtil.js.map