import { TimeoutError } from 'rxjs';
var ApiError = (function () {
    function ApiError(data, language) {
        this._code = NaN;
        if (data.hasOwnProperty('code'))
            this._code = data.code;
        var message = data;
        if (data.hasOwnProperty('text'))
            message = data.text;
        else if (data.hasOwnProperty('message'))
            message = data.message;
        else if (data.hasOwnProperty('description'))
            message = data.description;
        this.parseMessage(message, language);
    }
    ApiError.createSystemError = function (error) {
        var data = {};
        if (error.hasOwnProperty('code'))
            data.code = error.code;
        else
            data.code = ApiError.ERROR_CODE_NO_CONNECTION;
        if (error.hasOwnProperty('message') && error.message)
            data.message = error.message;
        if (error instanceof TimeoutError)
            data.code = ApiError.ERROR_CODE_IDLE_TIMEOUT;
        return new ApiError(data);
    };
    ApiError.prototype.parseMessage = function (data, language) {
        this._message = data;
        if (!(typeof data !== 'object' && typeof data !== 'function'))
            return;
        if (!language)
            language = ApiError.DEFAULT_LANGUAGE;
        if (data.hasOwnProperty(language))
            this._message = data[language];
    };
    Object.defineProperty(ApiError.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiError.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiError.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiError.prototype, "isSystem", {
        get: function () {
            return this.code == ApiError.ERROR_CODE_NO_CONNECTION || this.code == ApiError.ERROR_CODE_IDLE_TIMEOUT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiError.prototype, "isSpecial", {
        get: function () {
            if (isNaN(this._code) || ApiError.ERROR_SPECIAL_CODES.length == 0)
                return false;
            return ApiError.ERROR_SPECIAL_CODES.indexOf(this._code) != -1;
        },
        enumerable: true,
        configurable: true
    });
    ApiError.ERROR_CODE_IDLE_TIMEOUT = -2;
    ApiError.ERROR_CODE_NO_CONNECTION = -1;
    ApiError.ERROR_SPECIAL_CODES = [];
    ApiError.DEFAULT_LANGUAGE = 'en';
    return ApiError;
}());
export { ApiError };
//# sourceMappingURL=../../../src/common/api/ApiError.js.map