import { ArrayUtil } from '../util/ArrayUtil';
var MapCollection = (function () {
    function MapCollection(uid) {
        if (uid === void 0) { uid = 'id'; }
        var _this = this;
        this.trackByFn = function (index, item) {
            var key = null;
            try {
                key = item[_this.uid];
            }
            catch (error) { }
            return key || index;
        };
        this.uid = uid;
        this.map = new Map();
        this._length = 0;
        this._collection = [];
    }
    MapCollection.prototype.add = function (item, isFirst) {
        if (isFirst === void 0) { isFirst = false; }
        if (!item)
            return null;
        var key = null;
        try {
            key = item[this.uid];
        }
        catch (error) { }
        if (!key)
            return null;
        key = key.toString();
        if (this.has(key))
            return null;
        if (isFirst)
            this._collection.unshift(item);
        else
            this._collection.push(item);
        this.map.set(key, item);
        this.setLength(this._collection.length);
        return item;
    };
    MapCollection.prototype.get = function (key) {
        return key ? this.map.get(key.toString()) : null;
    };
    MapCollection.prototype.has = function (key) {
        return key ? this.map.has(key.toString()) : null;
    };
    MapCollection.prototype.clear = function () {
        this.map.clear();
        this._collection.splice(0, this.length);
        this.setLength(this._collection.length);
    };
    MapCollection.prototype.remove = function (key) {
        if (!this.has(key))
            return null;
        var item = this.get(key);
        if (ArrayUtil.remove(this._collection, item))
            this.setLength(this._collection.length);
        this.map.delete(key.toString());
        return item;
    };
    MapCollection.prototype.move = function (oldIndex, newIndex) {
        ArrayUtil.move(this._collection, oldIndex, newIndex);
    };
    MapCollection.prototype.keys = function () {
        var array = [];
        this.map.forEach(function (item, key) { return array.push(key); });
        return array;
    };
    MapCollection.prototype.values = function () {
        var array = [];
        this.map.forEach(function (item) { return array.push(item); });
        return array;
    };
    MapCollection.prototype.clone = function () {
        var map = new MapCollection(this.uid);
        this._collection.forEach(function (item) { return map.add(item); });
        return map;
    };
    MapCollection.prototype.setLength = function (value) {
        this._length = value;
    };
    Object.defineProperty(MapCollection.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCollection.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        enumerable: true,
        configurable: true
    });
    return MapCollection;
}());
export { MapCollection };
//# sourceMappingURL=../../../src/common/map/MapCollection.js.map