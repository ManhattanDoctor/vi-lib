var ApiRequest = (function () {
    function ApiRequest(param) {
        this._config = param;
    }
    ApiRequest.prototype.getConfig = function () {
        return this._config;
    };
    ApiRequest.prototype.toString = function () {
        return JSON.stringify(this.data);
    };
    ApiRequest.prototype.destroy = function () {
        this._config = null;
    };
    Object.defineProperty(ApiRequest.prototype, "isHandleLoading", {
        get: function () {
            return this._config.isHandleLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "isHandleError", {
        get: function () {
            return this._config.isHandleError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "data", {
        get: function () {
            return this._config.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "name", {
        get: function () {
            return this._config.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "idleTimeout", {
        get: function () {
            return this._config.idleTimeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "responseType", {
        get: function () {
            return this._config.responseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRequest.prototype, "method", {
        get: function () {
            return this._config.method;
        },
        enumerable: true,
        configurable: true
    });
    return ApiRequest;
}());
export { ApiRequest };
//# sourceMappingURL=../../../src/common/api/ApiRequest.js.map