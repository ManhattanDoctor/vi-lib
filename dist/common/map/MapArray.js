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
import { ArrayUtil } from '../util/ArrayUtil';
var MapArray = (function (_super) {
    __extends(MapArray, _super);
    function MapArray() {
        var _this = _super.call(this) || this;
        _this._collection = [];
        return _this;
    }
    MapArray.prototype.remove = function (key) {
        var value = this.get(key);
        if (value)
            ArrayUtil.remove(this._collection, value);
    };
    MapArray.prototype.clear = function () {
        _super.prototype.clear.call(this);
        ArrayUtil.clear(this._collection);
    };
    MapArray.prototype.delete = function (key) {
        if (!key)
            return false;
        this.remove(key);
        return _super.prototype.delete.call(this, key);
    };
    MapArray.prototype.set = function (key, value) {
        if (!key)
            return;
        this.remove(key);
        this._collection.push(value);
        return _super.prototype.set.call(this, key, value);
    };
    Object.defineProperty(MapArray.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        enumerable: true,
        configurable: true
    });
    return MapArray;
}(Map));
export { MapArray };
//# sourceMappingURL=../../../src/common/map/MapArray.js.map