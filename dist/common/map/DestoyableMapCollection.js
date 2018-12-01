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
import { MapCollection } from './MapCollection';
var DestroyableMapCollection = (function (_super) {
    __extends(DestroyableMapCollection, _super);
    function DestroyableMapCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DestroyableMapCollection.prototype.clear = function () {
        if (this.length > 0)
            this.map.forEach(function (item) {
                item.destroy();
            });
        _super.prototype.clear.call(this);
    };
    DestroyableMapCollection.prototype.remove = function (key) {
        var item = _super.prototype.remove.call(this, key);
        if (item)
            item.destroy();
        return item;
    };
    DestroyableMapCollection.prototype.destroy = function () {
        this.clear();
        this.map = null;
        this._collection = null;
    };
    return DestroyableMapCollection;
}(MapCollection));
export { DestroyableMapCollection };
//# sourceMappingURL=../../../src/common/map/DestoyableMapCollection.js.map