import { HttpParams } from '@angular/common/http';
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.parseUrl = function (value) {
        if (!value)
            return value;
        value = value.toString();
        if (value.substr(-1) != '/')
            value += '/';
        return value;
    };
    UrlUtil.convertToParams = function (param) {
        if (!param)
            return null;
        var entries = Object.entries(param);
        if (entries.length == 0)
            return;
        var value = new HttpParams();
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var item = entries_1[_i];
            value = value.append(item[0], item[1].toString());
        }
        return value;
    };
    UrlUtil.convertLinks = function (text, options) {
        return linkifyStr ? linkifyStr(text, options) : text;
    };
    UrlUtil.isImageUrl = function (url) {
        return url && url.length > 0 ? UrlUtil.IMAGE_REG_EXP.test(url) : false;
    };
    UrlUtil.isAbsoluteUrl = function (url) {
        return UrlUtil.ABSOLUTE_URL_EXP.test(url);
    };
    UrlUtil.removeTags = function (text) {
        return text.replace(UrlUtil.TAG_REG_EXP, '');
    };
    UrlUtil.ABSOLUTE_URL_EXP = /^https?:\/\//i;
    UrlUtil.TAG_REG_EXP = /<[^>]*>/gi;
    UrlUtil.IMAGE_REG_EXP = /(http[s]?:\/\/.*\.(?:png|jpg|jpeg))/i;
    return UrlUtil;
}());
export { UrlUtil };
//# sourceMappingURL=../../../src/common/util/UrlUtil.js.map