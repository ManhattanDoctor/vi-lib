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
import { MatDialogConfig } from '@angular/material';
import { ViewUtil } from '../../common/util/ViewUtil';
var WindowConfig = (function (_super) {
    __extends(WindowConfig, _super);
    function WindowConfig(isModal, isResizeable, width, height) {
        if (isModal === void 0) { isModal = false; }
        if (isResizeable === void 0) { isResizeable = false; }
        if (width === void 0) { width = NaN; }
        if (height === void 0) { height = NaN; }
        var _this = _super.call(this) || this;
        _this.isResizeable = false;
        _this.isMinimizable = false;
        _this.isContentDragable = true;
        _this.defaultWidth = NaN;
        _this.defaultMinWidth = NaN;
        _this.defaultMaxWidth = NaN;
        _this.defaultHeight = NaN;
        _this.defaultMinHeight = NaN;
        _this.defaultMaxHeight = NaN;
        _this.paddingTop = NaN;
        _this.paddingLeft = NaN;
        _this.paddingRight = NaN;
        _this.paddingBottom = NaN;
        _this._isModal = false;
        _this._elementMinWidth = NaN;
        _this._elementMaxWidth = NaN;
        _this._elementMinHeight = NaN;
        _this._elementMaxHeight = NaN;
        _this.isModal = _this.hasBackdrop = isModal;
        _this.isResizeable = isResizeable;
        if (!isNaN(width))
            _this.defaultWidth = width;
        if (!isNaN(height))
            _this.defaultHeight = height;
        return _this;
    }
    WindowConfig.prototype.setDefaultProperties = function () {
        this.width = this.elementWidth;
        this.maxWidth = this.elementMaxWidth;
        this.minWidth = this.elementMinWidth;
        this.height = this.elementHeight;
        this.maxHeight = this.elementMaxHeight;
        this.minHeight = this.elementMinHeight;
    };
    WindowConfig.prototype.parseX = function (value) {
        value = Math.max(value, this.elementMinX);
        value = Math.min(value, this.elementMaxX);
        return value;
    };
    WindowConfig.prototype.parseY = function (value) {
        value = Math.max(value, this.elementMinY);
        value = Math.min(value, this.elementMaxY);
        return value;
    };
    WindowConfig.prototype.parseWidth = function (value) {
        value = Math.max(value, this.elementMinWidth);
        value = Math.min(value, this.elementMaxWidth);
        return value;
    };
    WindowConfig.prototype.parseHeight = function (value) {
        value = Math.max(value, this.elementMinHeight);
        value = Math.min(value, this.elementMaxHeight);
        return value;
    };
    WindowConfig.prototype.destroy = function () { };
    Object.defineProperty(WindowConfig.prototype, "isModal", {
        get: function () {
            return this._isModal;
        },
        set: function (value) {
            if (value === this._isModal)
                return;
            this._isModal = value;
            this.hasBackdrop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMinY", {
        get: function () {
            if (!isNaN(this._elementMinY))
                return this._elementMinY;
            this._elementMinY = -ViewUtil.stageHeight;
            if (!isNaN(this.paddingTop))
                this._elementMinY += this.paddingTop;
            return this._elementMinY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMaxY", {
        get: function () {
            if (!isNaN(this._elementMaxY))
                return this._elementMaxY;
            this._elementMaxY = ViewUtil.stageHeight;
            if (!isNaN(this.paddingBottom))
                this._elementMaxY -= this.paddingBottom;
            return this._elementMaxY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMinX", {
        get: function () {
            if (!isNaN(this._elementMinX))
                return this._elementMinX;
            this._elementMinX = -ViewUtil.stageWidth;
            if (!isNaN(this.paddingLeft))
                this._elementMinX += this.paddingLeft;
            return this._elementMinX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMaxX", {
        get: function () {
            if (!isNaN(this._elementMaxX))
                return this._elementMaxX;
            this._elementMaxX = ViewUtil.stageWidth;
            if (!isNaN(this.paddingRight))
                this._elementMaxX -= this.paddingRight;
            return this._elementMaxX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementWidth", {
        get: function () {
            if (this._elementWidth)
                return this._elementWidth;
            this._elementWidth = 'auto';
            if (this.defaultWidth)
                this._elementWidth = this.defaultWidth + 'px';
            return this._elementWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMinWidth", {
        get: function () {
            if (!isNaN(this._elementMinWidth))
                return this._elementMinWidth;
            this._elementMinWidth = 0;
            if (!isNaN(this.defaultMinWidth)) {
                var value = ViewUtil.stageWidth;
                if (!isNaN(this.paddingLeft))
                    value -= this.paddingLeft;
                if (!isNaN(this.paddingRight))
                    value -= this.paddingRight;
                this._elementMinWidth = Math.min(this.defaultMinWidth, value);
            }
            return this._elementMinWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMaxWidth", {
        get: function () {
            if (!isNaN(this._elementMaxWidth))
                return this._elementMaxWidth;
            this._elementMaxWidth = ViewUtil.stageWidth;
            if (!isNaN(this.paddingLeft))
                this._elementMaxWidth -= this.paddingLeft;
            if (!isNaN(this.paddingRight))
                this._elementMaxWidth -= this.paddingRight;
            if (!isNaN(this.defaultMaxWidth))
                this._elementMaxWidth = Math.min(this.defaultMaxWidth, this._elementMaxWidth);
            return this._elementMaxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementHeight", {
        get: function () {
            if (this._elementHeight)
                return this._elementHeight;
            this._elementHeight = 'auto';
            if (this.defaultHeight)
                this._elementHeight = this.defaultHeight + 'px';
            return this._elementHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMinHeight", {
        get: function () {
            if (!isNaN(this._elementMinHeight))
                return this._elementMinHeight;
            this._elementMinHeight = 0;
            if (!isNaN(this.defaultMinHeight)) {
                var value = ViewUtil.stageHeight;
                if (!isNaN(this.paddingTop))
                    value -= this.paddingTop;
                if (!isNaN(this.paddingBottom))
                    value -= this.paddingBottom;
                this._elementMinHeight = Math.min(this.defaultMinHeight, value);
            }
            return this._elementMinHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowConfig.prototype, "elementMaxHeight", {
        get: function () {
            if (!isNaN(this._elementMaxHeight))
                return this._elementMaxHeight;
            this._elementMaxHeight = ViewUtil.stageHeight;
            if (!isNaN(this.paddingTop))
                this._elementMaxHeight -= this.paddingTop;
            if (!isNaN(this.paddingBottom))
                this._elementMaxHeight -= this.paddingBottom;
            if (!isNaN(this.defaultMaxHeight))
                this._elementMaxHeight = Math.min(this.defaultMaxHeight, this._elementMaxHeight);
            return this._elementMaxHeight;
        },
        enumerable: true,
        configurable: true
    });
    return WindowConfig;
}(MatDialogConfig));
export { WindowConfig };
//# sourceMappingURL=../../../src/window/lib/WindowConfig.js.map