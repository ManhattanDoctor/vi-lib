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
import { DestroyableComponent } from '../../common/component/DestroyableComponent';
import { ViewUtil } from '../../common/util/ViewUtil';
var WindowBase = (function (_super) {
    __extends(WindowBase, _super);
    function WindowBase() {
        var _this = _super.call(this) || this;
        _this._x = NaN;
        _this._width = NaN;
        _this._y = NaN;
        _this._height = NaN;
        _this.checkSizeAndUpdatePositionIfNeed = function () {
            if (isNaN(_this.height) || isNaN(_this.width))
                _this.setPosition();
        };
        return _this;
    }
    WindowBase.prototype.setProperties = function () {
        var config = this.getConfig();
        if (!isNaN(config.defaultWidth))
            this.width = config.defaultWidth;
        if (!isNaN(config.defaultHeight))
            this.height = config.defaultHeight;
    };
    WindowBase.prototype.setPosition = function () {
        var width = null;
        var height = null;
        var config = this.getConfig();
        switch (config.horizontalAlign) {
            case 'start':
                this.x = !isNaN(this.paddingLeft) ? this.paddingLeft : 0;
                break;
            case 'end':
                width = !isNaN(this.width) ? this.width : ViewUtil.getWidth(this.getContainer());
                var value = ViewUtil.stageWidth - width;
                if (!isNaN(this.paddingRight))
                    value -= this.paddingRight;
                this.x = value;
                break;
            default:
                width = !isNaN(this.width) ? this.width : ViewUtil.getWidth(this.getContainer());
                this.x = (ViewUtil.stageWidth - width) / 2;
                break;
        }
        switch (config.verticalAlign) {
            case 'start':
                this.y = !isNaN(this.paddingTop) ? this.paddingTop : 0;
                break;
            case 'end':
                height = !isNaN(this.height) ? this.height : ViewUtil.getHeight(this.getContainer());
                var value = ViewUtil.stageHeight - height;
                if (!isNaN(this.paddingBottom))
                    value -= this.paddingBottom;
                this.y = value;
                break;
            default:
                height = !isNaN(this.height) ? this.height : ViewUtil.getHeight(this.getContainer());
                this.y = (ViewUtil.stageHeight - height) / 2;
                break;
        }
    };
    WindowBase.prototype.clearSize = function () {
        this._x = NaN;
        this._y = NaN;
        this._width = NaN;
        this._height = NaN;
    };
    WindowBase.prototype.commitSizeProperties = function () {
        var width = !isNaN(this._width) ? this._width + 'px' : 'auto';
        var height = !isNaN(this._height) ? this._height + 'px' : 'auto';
        this.getReference().updateSize(width, height);
    };
    WindowBase.prototype.commitPositionProperties = function () {
        if (isNaN(this._x) && isNaN(this._y))
            return;
        var position = {};
        if (!isNaN(this._y))
            position.top = this._y + 'px';
        if (!isNaN(this._x))
            position.left = this._x + 'px';
        this.getReference().updatePosition(position);
    };
    Object.defineProperty(WindowBase.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            value = this.getConfig().parseX(value);
            if (value === this._x)
                return;
            this._x = value;
            this.commitPositionProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            value = this.getConfig().parseY(value);
            if (value === this._y)
                return;
            this._y = value;
            this.commitPositionProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "paddingTop", {
        get: function () {
            return this.getConfig().paddingTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "paddingLeft", {
        get: function () {
            return this.getConfig().paddingLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "paddingRight", {
        get: function () {
            return this.getConfig().paddingRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "paddingBottom", {
        get: function () {
            return this.getConfig().paddingBottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            value = this.getConfig().parseWidth(value);
            if (value === this._width)
                return;
            this._width = value;
            this.commitSizeProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowBase.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            value = this.getConfig().parseHeight(value);
            if (value === this._height)
                return;
            this._height = value;
            this.commitSizeProperties();
        },
        enumerable: true,
        configurable: true
    });
    return WindowBase;
}(DestroyableComponent));
export { WindowBase };
//# sourceMappingURL=../../../src/window/lib/WindowBase.js.map