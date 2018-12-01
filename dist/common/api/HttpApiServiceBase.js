var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/internal/operators';
import { ApiError } from './ApiError';
import { ApiResponse } from './ApiResponse';
import { ApiServiceBase } from './ApiServiceBase';
var HttpApiServiceBase = (function (_super) {
    __extends(HttpApiServiceBase, _super);
    function HttpApiServiceBase(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.idleTimeout = 2 * ApiServiceBase.IDLE_TIMEOUT;
        return _this;
    }
    HttpApiServiceBase.prototype.makeRequest = function (url, method, params, headers, idleTimeout, responseType) {
        var observable = null;
        if (method == 'get')
            observable = this.http.get(url, { headers: headers, params: params, responseType: responseType });
        else if (method == 'post')
            observable = this.http.post(url, params, { headers: headers, responseType: responseType });
        else if (method == 'put')
            observable = this.http.put(url, params, { headers: headers, responseType: responseType });
        else if (method == 'delete')
            observable = this.http.delete(url, { headers: headers, responseType: responseType });
        if (!observable)
            throw new Error('Unable to make request: method is undefined');
        return observable.pipe(timeout(idleTimeout));
    };
    HttpApiServiceBase.prototype.createHeadersForRequest = function (request, method, body) {
        return new HttpHeaders();
    };
    HttpApiServiceBase.prototype.parseResponse = function (data, request) {
        return new ApiResponse(data, request);
    };
    HttpApiServiceBase.prototype.parseErrorResponse = function (error, request) {
        return this.parseResponse(ApiError.createSystemError(error), request);
    };
    return HttpApiServiceBase;
}(ApiServiceBase));
export { HttpApiServiceBase };
//# sourceMappingURL=../../../src/common/api/HttpApiServiceBase.js.map