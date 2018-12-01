var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.sort = function (array) {
        if (array)
            array.sort(ArrayUtil.sortFunction);
    };
    ArrayUtil.sortFunction = function (first, second) {
        if (!first && !second)
            return 0;
        if (first && !second)
            return -1;
        if (!first && second)
            return 1;
        if (first.sortIndex == second.sortIndex)
            return 0;
        return first.sortIndex < second.sortIndex ? -1 : 1;
    };
    ArrayUtil.move = function (array, oldIndex, newIndex) {
        if (oldIndex > -1 && newIndex < array.length && oldIndex != newIndex)
            array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    };
    ArrayUtil.isEmpty = function (array) {
        return !array || array.length == 0;
    };
    ArrayUtil.clear = function (array) {
        array.splice(0, array.length);
    };
    ArrayUtil.remove = function (array, item) {
        var index = array.indexOf(item);
        if (index > -1)
            array.splice(index, 1);
        return index > -1;
    };
    ArrayUtil.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    };
    ArrayUtil.reverse = function (array) {
        array.reverse();
    };
    ArrayUtil.removeEmpty = function (array) {
        for (var i = array.length - 1; i > -1; i--) {
            var value = array[i];
            if (!value || value.toString().trim().length == 0)
                array.splice(i, 1);
        }
    };
    ArrayUtil.parseQueryString = function (queryString) {
        var result = {};
        var decoded = '';
        try {
            decoded = decodeURIComponent(queryString);
        }
        catch (error) {
            return result;
        }
        if (!decoded.length)
            return result;
        var params = decoded.split('?');
        if (params.length == 1)
            return result;
        params = params[1];
        params = params.split('&');
        for (var i = 0; i < params.length; ++i) {
            var pair = params[i];
            var sepIndex = pair.indexOf('=');
            if (sepIndex != -1) {
                var name_1 = pair.substr(0, sepIndex);
                result[name_1] = pair.substr(sepIndex + 1);
            }
            else {
                result[pair] = '';
            }
        }
        return result;
    };
    return ArrayUtil;
}());
export { ArrayUtil };
//# sourceMappingURL=../../../src/common/util/ArrayUtil.js.map