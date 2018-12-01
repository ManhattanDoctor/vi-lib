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
import { DestroyableContainer } from '../../container/DestroyableContainer';
import { LoadableEvent } from '../../lib/Loadable';
import { ArrayUtil } from '../../util/ArrayUtil';
var MenuItems = (function (_super) {
    __extends(MenuItems, _super);
    function MenuItems(language, filterFunction, isAutoTranslate) {
        if (isAutoTranslate === void 0) { isAutoTranslate = false; }
        var _this = _super.call(this) || this;
        _this.language = language;
        _this._items = [];
        _this.filterFunction = filterFunction;
        _this.addSubscription(language.events.subscribe(function (data) {
            if (data.type == LoadableEvent.COMPLETE) {
                _this.items.forEach(function (item) {
                    if (isAutoTranslate)
                        _this.translate(item);
                    else
                        item.name = null;
                });
            }
        }));
        return _this;
    }
    MenuItems.prototype.translate = function (item) {
        item.name = this.language.translate(item.nameId);
    };
    MenuItems.prototype.add = function (item) {
        this._items.push(item);
        return item;
    };
    MenuItems.prototype.remove = function (item) {
        var index = this._items.indexOf(item);
        if (index > -1)
            this._items.slice(index, 1);
        return item;
    };
    MenuItems.prototype.checkEnabled = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        ArrayUtil.sort(this._items);
        var isAllEnabled = false;
        this.items.forEach(function (item) {
            if (!item.name && item.nameId)
                _this.translate(item);
            var isEnabled = item.checkEnabled ? item.checkEnabled(item) : true;
            if (isEnabled && _this.filterFunction)
                isEnabled = _this.filterFunction(item);
            item.enabled = isEnabled;
            if (isEnabled)
                isAllEnabled = true;
        });
        return isAllEnabled;
    };
    MenuItems.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._items = null;
    };
    Object.defineProperty(MenuItems.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    return MenuItems;
}(DestroyableContainer));
export { MenuItems };
//# sourceMappingURL=../../../../src/common/component/menu/MenuItems.js.map