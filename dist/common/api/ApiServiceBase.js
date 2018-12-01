var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ObservableData } from '../observer/ObservableData';
import { ApiRequest } from './ApiRequest';
var ApiServiceBase = (function () {
    function ApiServiceBase() {
        this.idleTimeout = ApiServiceBase.IDLE_TIMEOUT;
        this.responseType = 'json';
        this.defaultMethod = 'post';
        this.observer = new Subject();
    }
    ApiServiceBase.prototype.sendRequest = function (request, resolve, reject, observer) {
        var _this = this;
        this._isLoading = true;
        this.observer.next(new ObservableData(ApiServiceBaseEvent.STARTED, request));
        var subscription = this.sendRequestToServer(request).subscribe(function (response) {
            subscription.unsubscribe();
            var apiResponse = _this.parseResponse(response, request);
            _this._isLoading = false;
            _this.observer.next(new ObservableData(ApiServiceBaseEvent.FINISHED, apiResponse));
            if (observer) {
                observer.next(apiResponse);
                observer.complete();
            }
            if (apiResponse.isHasError) {
                if (reject)
                    reject(apiResponse);
                _this.observer.next(new ObservableData(ApiServiceBaseEvent.ERROR, apiResponse, apiResponse.error));
            }
            else {
                if (resolve)
                    resolve(apiResponse);
                _this.observer.next(new ObservableData(ApiServiceBaseEvent.COMPLETE, apiResponse));
            }
        }, function (error) {
            subscription.unsubscribe();
            var apiResponse = _this.parseErrorResponse(error, request);
            if (reject)
                reject(apiResponse);
            _this._isLoading = false;
            _this.observer.next(new ObservableData(ApiServiceBaseEvent.FINISHED, apiResponse));
            if (observer) {
                observer.next(apiResponse);
                observer.complete();
            }
            _this.observer.next(new ObservableData(ApiServiceBaseEvent.ERROR, apiResponse, apiResponse.error));
        });
    };
    ApiServiceBase.prototype.sendRequestToServer = function (request) {
        var method = request.method || this.defaultMethod;
        var url = this.createUrlForRequest(request, method);
        var params = this.createParamsForRequest(request, method);
        var headers = this.createHeadersForRequest(request, method, params);
        var idleTimeout = request.idleTimeout || this.idleTimeout;
        var responseType = request.responseType || this.responseType;
        return this.makeRequest(url, method, params, headers, idleTimeout, responseType);
    };
    ApiServiceBase.prototype.convertToParams = function (params) {
        var value = new HttpParams();
        if (!params)
            return;
        Object.keys(params).forEach(function (key) { return (value = value.append(key, params[key])); });
        return value;
    };
    ApiServiceBase.prototype.send = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                if (param.isHandleLoading == null || param.isHandleLoading == undefined)
                    param.isHandleLoading = false;
                if (param.isHandleError == null || param.isHandleError == undefined)
                    param.isHandleError = true;
                request = new ApiRequest(param);
                return [2, new Promise(function (resolve, reject) {
                        _this.sendRequest(request, resolve, reject);
                    })];
            });
        });
    };
    ApiServiceBase.prototype.call = function (param) {
        var _this = this;
        if (param.isHandleLoading == null || param.isHandleLoading == undefined)
            param.isHandleLoading = false;
        if (param.isHandleError == null || param.isHandleError == undefined)
            param.isHandleError = true;
        var request = new ApiRequest(param);
        return new Observable(function (observer) {
            _this.sendRequest(request, null, null, observer);
        });
    };
    Object.defineProperty(ApiServiceBase.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiServiceBase.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ApiServiceBase.IDLE_TIMEOUT = 30000;
    return ApiServiceBase;
}());
export { ApiServiceBase };
export var ApiServiceBaseEvent;
(function (ApiServiceBaseEvent) {
    ApiServiceBaseEvent["ERROR"] = "ERROR";
    ApiServiceBaseEvent["STARTED"] = "STARTED";
    ApiServiceBaseEvent["FINISHED"] = "FINISHED";
    ApiServiceBaseEvent["COMPLETE"] = "COMPLETE";
})(ApiServiceBaseEvent || (ApiServiceBaseEvent = {}));
//# sourceMappingURL=../../../src/common/api/ApiServiceBase.js.map