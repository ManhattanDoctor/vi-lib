var DateUtil = (function () {
    function DateUtil() {
    }
    DateUtil.getTime = function (value) {
        var date = DateUtil.parseDate(value);
        return date ? date.getTime() : NaN;
    };
    DateUtil.getDate = function (time) {
        var date = new Date();
        date.setTime(time);
        return date;
    };
    DateUtil.parseDate = function (value) {
        if (!value)
            return null;
        if (value instanceof Date)
            return value;
        var dateNumber = Number(value);
        if (!isNaN(value) && dateNumber)
            return dateNumber > 0 ? DateUtil.getDate(dateNumber) : null;
        if (value instanceof Array)
            return value.length == 3 ? new Date(value[2], value[1], value[0]) : null;
        if (typeof value === 'string')
            return DateUtil.parseDate(value.split('.'));
        return null;
    };
    DateUtil.prototype.isEqual = function (first, second) {
        if (first == second)
            return true;
        if ((first === undefined || first === null) && (second === undefined || second === null))
            return true;
        if (first && second && first.getTime() == second.getTime())
            return true;
        return false;
    };
    DateUtil.isUnknown = function (date) {
        if (date && date.getTime() == 1230757200000)
            return true;
        return date == null || date == undefined;
    };
    Object.defineProperty(DateUtil, "serverTime", {
        get: function () {
            return DateUtil.serverDateTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateUtil, "serverDate", {
        get: function () {
            var time = new Date().getTime() - DateUtil.serverDateUpdateTime;
            return DateUtil.getDate(DateUtil.serverDateTime + time);
        },
        enumerable: true,
        configurable: true
    });
    DateUtil.updateServerDate = function (date) {
        DateUtil.serverDateTime = date.getTime();
        DateUtil.serverDateUpdateTime = new Date().getTime();
    };
    DateUtil.getTimeLeft = function (date) {
        return date.getTime() - DateUtil.serverDate.getTime();
    };
    DateUtil.MILISECONDS_YEAR = 12 * 30 * 24 * 60 * 60 * 1000;
    DateUtil.MILISECONDS_MONTH = 30 * 24 * 60 * 60 * 1000;
    DateUtil.MILISECONDS_DAY = 24 * 60 * 60 * 1000;
    DateUtil.MILISECONDS_HOUR = 60 * 60 * 1000;
    DateUtil.MILISECONDS_MINUTE = 60 * 1000;
    DateUtil.MILISECONDS_SECOND = 1000;
    DateUtil.serverDateTime = new Date().getTime();
    DateUtil.serverDateUpdateTime = new Date().getTime();
    return DateUtil;
}());
export { DateUtil };
//# sourceMappingURL=../../../src/common/util/DateUtil.js.map