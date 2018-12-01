import { ApiError } from './ApiError';
var ApiResponse = (function () {
    function ApiResponse(data, request, language) {
        this._data = data;
        this._request = request;
        if (request)
            this._name = request.name;
        this.parse(data, language);
    }
    ApiResponse.prototype.parse = function (data, language) {
        this._data = this.parseData(data, language);
        if (this.isErrorData(data))
            this._error = this.parseError(data, language);
    };
    ApiResponse.prototype.parseData = function (data, language) {
        return data;
    };
    ApiResponse.prototype.parseError = function (data, language) {
        return data instanceof ApiError ? data : this.createError(data, language);
    };
    ApiResponse.prototype.createError = function (data, language) {
        return new ApiError(data.error, language);
    };
    ApiResponse.prototype.isErrorData = function (data) {
        if (data instanceof ApiError)
            return true;
        return data ? data.hasOwnProperty('error') : false;
    };
    Object.defineProperty(ApiResponse.prototype, "isHandleError", {
        get: function () {
            return this._request ? this._request.isHandleError : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "isHandleLoading", {
        get: function () {
            return this._request ? this._request.isHandleLoading : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "isHasError", {
        get: function () {
            return this._error != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "request", {
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiResponse.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return ApiResponse;
}());
export { ApiResponse };
//# sourceMappingURL=../../../src/common/api/ApiResponse.js.map