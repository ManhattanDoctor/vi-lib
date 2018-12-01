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
import { IWindow } from './IWindow';
var IWindowContent = (function (_super) {
    __extends(IWindowContent, _super);
    function IWindowContent(container) {
        var _this = _super.call(this) || this;
        _this.container = container;
        return _this;
    }
    IWindowContent.prototype.commitWindowProperties = function () { };
    IWindowContent.prototype.ngAfterViewInit = function () {
        this.emit(IWindow.EVENT_CONTENT_READY);
    };
    IWindowContent.prototype.blink = function () {
        if (this.window)
            this.window.blink();
    };
    IWindowContent.prototype.shake = function () {
        if (this.window)
            this.window.shake();
    };
    IWindowContent.prototype.emit = function (event) {
        if (this.window)
            this.window.emit(event);
    };
    IWindowContent.prototype.close = function () {
        if (this.window)
            this.window.close();
    };
    IWindowContent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.container = null;
        this.window = null;
    };
    Object.defineProperty(IWindowContent.prototype, "config", {
        get: function () {
            return this.window ? this.window.config : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IWindowContent.prototype, "isOnTop", {
        get: function () {
            return this.window ? this.window.isOnTop : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IWindowContent.prototype, "isMinimized", {
        get: function () {
            return this.window ? this.window.isMinimized : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IWindowContent.prototype, "element", {
        get: function () {
            return this.container ? this.container.element : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IWindowContent.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (value) {
            if (value === this._window)
                return;
            this._window = value;
            if (this._window)
                this.commitWindowProperties();
        },
        enumerable: true,
        configurable: true
    });
    return IWindowContent;
}(DestroyableComponent));
export { IWindowContent };
//# sourceMappingURL=../../../src/window/lib/IWindowContent.js.map