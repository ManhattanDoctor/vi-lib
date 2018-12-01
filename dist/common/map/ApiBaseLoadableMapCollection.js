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
import { LoadableMapCollection } from './LoadableMapCollection';
var ApiBaseLoadableMapCollection = (function (_super) {
    __extends(ApiBaseLoadableMapCollection, _super);
    function ApiBaseLoadableMapCollection(api, requestName, requestMethod, uid) {
        if (uid === void 0) { uid = 'id'; }
        var _this = _super.call(this, uid) || this;
        _this.api = api;
        _this.requestName = requestName;
        _this.requestMethod = requestMethod;
        return _this;
    }
    ApiBaseLoadableMapCollection.prototype.sort = function () { };
    ApiBaseLoadableMapCollection.prototype.createParamsForRequest = function () {
        return {};
    };
    ApiBaseLoadableMapCollection.prototype.parseErrorResponse = function (response) { };
    ApiBaseLoadableMapCollection.prototype.makeRequest = function () {
        return this.api.call({ name: this.requestName, method: this.requestMethod, data: this.createParamsForRequest() });
    };
    ApiBaseLoadableMapCollection.prototype.parseResponse = function (response) {
        var array = response.data;
        for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
            var item = _a[_i];
            var value = this.parseItem(item);
            if (value)
                this.add(value);
        }
        this.sort();
    };
    ApiBaseLoadableMapCollection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.api = null;
    };
    return ApiBaseLoadableMapCollection;
}(LoadableMapCollection));
export { ApiBaseLoadableMapCollection };
//# sourceMappingURL=../../../src/common/map/ApiBaseLoadableMapCollection.js.map