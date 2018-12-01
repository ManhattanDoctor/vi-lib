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
import { DestroyableMapCollection } from './DestoyableMapCollection';
var FilterableMapCollection = (function (_super) {
    __extends(FilterableMapCollection, _super);
    function FilterableMapCollection(uid) {
        if (uid === void 0) { uid = 'id'; }
        var _this = _super.call(this, uid) || this;
        _this._filters = [];
        _this._filtered = [];
        return _this;
    }
    FilterableMapCollection.prototype.filter = function (item) {
        if (this._filters.length == 0)
            return true;
        return this._filters.every(function (filter) {
            return filter(item);
        });
    };
    FilterableMapCollection.prototype.clear = function () {
        if (this.length > 0)
            ArrayUtil.clear(this._filtered);
        _super.prototype.clear.call(this);
    };
    FilterableMapCollection.prototype.add = function (item, isFirst) {
        if (isFirst === void 0) { isFirst = false; }
        item = _super.prototype.add.call(this, item, isFirst);
        if (item && this.filter(item)) {
            if (isFirst)
                this._filtered.unshift(item);
            else
                this._filtered.push(item);
        }
        return item;
    };
    FilterableMapCollection.prototype.remove = function (key) {
        var item = _super.prototype.remove.call(this, key);
        if (item) {
            ArrayUtil.remove(this._filtered, item);
            item.destroy();
        }
        return item;
    };
    FilterableMapCollection.prototype.refresh = function () {
        var _this = this;
        ArrayUtil.clear(this._filtered);
        if (this.length == 0)
            return;
        this.collection.forEach(function (item) {
            if (_this.filter(item))
                _this._filtered.push(item);
        });
    };
    FilterableMapCollection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._filtered = null;
    };
    Object.defineProperty(FilterableMapCollection.prototype, "filtered", {
        get: function () {
            return this._filtered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterableMapCollection.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        enumerable: true,
        configurable: true
    });
    return FilterableMapCollection;
}(DestroyableMapCollection));
export { FilterableMapCollection };
//# sourceMappingURL=../../../src/common/map/FilterableMapCollection.js.map