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
import { ApiBaseLoadableMapCollection } from './ApiBaseLoadableMapCollection';
var PagedLoadableMapCollection = (function (_super) {
    __extends(PagedLoadableMapCollection, _super);
    function PagedLoadableMapCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._page = 0;
        _this._total = 0;
        _this.itemsOnPage = 10;
        return _this;
    }
    PagedLoadableMapCollection.prototype.reload = function () {
        this._page = 0;
        this._total = 0;
        this._currentPageItems = null;
        _super.prototype.reload.call(this);
    };
    PagedLoadableMapCollection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._page = null;
        this._total = null;
        this._currentPageItems = null;
    };
    PagedLoadableMapCollection.prototype.createParamsForRequest = function () {
        var param = _super.prototype.createParamsForRequest.call(this);
        param.itemsOnPage = this.itemsOnPage;
        param.page = this._page;
        return param;
    };
    PagedLoadableMapCollection.prototype.parseResponse = function (response) {
        var items = this.parseResponseItems(response);
        this._isAllLoaded = items.length == 0;
        if (this._isAllLoaded)
            return;
        this._page++;
        this._currentPageItems = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var value = this.parseItem(item);
            if (value) {
                this.add(value);
                this._currentPageItems.push(value);
            }
        }
        this.checkIsAllLoaded(response);
        this.sort();
    };
    PagedLoadableMapCollection.prototype.parseResponseItems = function (response) {
        var data = response.data;
        return data && data.hasOwnProperty('items') ? data.items : [];
    };
    PagedLoadableMapCollection.prototype.checkIsAllLoaded = function (response) {
        var data = response.data;
        if (data.hasOwnProperty('total'))
            this._total = data.total;
        this._isAllLoaded = this._total <= this.length;
    };
    Object.defineProperty(PagedLoadableMapCollection.prototype, "currentPage", {
        get: function () {
            return Math.max(0, this._page - 1);
        },
        set: function (value) {
            if (isNaN(value))
                value = 0;
            this._page = value;
            _super.prototype.reload.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagedLoadableMapCollection.prototype, "total", {
        get: function () {
            return this._total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagedLoadableMapCollection.prototype, "currentPageItems", {
        get: function () {
            return this._currentPageItems;
        },
        enumerable: true,
        configurable: true
    });
    return PagedLoadableMapCollection;
}(ApiBaseLoadableMapCollection));
export { PagedLoadableMapCollection };
//# sourceMappingURL=../../../src/common/map/PagedLoadableMapCollection.js.map