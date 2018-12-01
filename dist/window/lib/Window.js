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
import { Subject } from 'rxjs';
import { filter } from 'rxjs/internal/operators';
import { ViewUtil } from '../../common/util/ViewUtil';
import { IWindow } from './IWindow';
import { WindowBase } from './WindowBase';
var Window = (function (_super) {
    __extends(Window, _super);
    function Window(properties) {
        var _this = _super.call(this) || this;
        _this._isBlink = false;
        _this._isShaking = false;
        _this._isOnTop = false;
        _this._isMinimized = false;
        _this.isOpened = false;
        _this.isWasOnTop = false;
        _this.setClosed = function () {
            _this.isOpened = false;
            _this.emit(IWindow.EVENT_CLOSED);
            _this.destroy();
        };
        _this.setOpened = function () {
            _this.isOpened = true;
            _this.emit(IWindow.EVENT_OPENED);
        };
        _this.blinkToggle = function () {
            _this.isBlink = !_this.isBlink;
        };
        _this.stopShaking = function () {
            _this.isShaking = false;
        };
        _this.emitResize = function () {
            _this.emit(IWindow.EVENT_RESIZED);
        };
        _this.resizeHandler = function () {
            if (!_this.isOpened)
                return;
            clearTimeout(_this.resizeTimer);
            _this.resizeTimer = setTimeout(_this.emitResize, Window.RESIZE_DELAY);
        };
        _this.mouseDownHandlerProxy = function (event) {
            _this.mouseDownHandler(event);
        };
        _this.mouseClickHandlerProxy = function (event) {
            _this.mouseClickHandler(event);
        };
        _this.setOnTop = function () {
            _this.isWasOnTop = _this.isOnTop;
            _this.emit(IWindow.EVENT_SET_ON_TOP);
        };
        _this.observer = new Subject();
        _this.properties = properties;
        _this.content.window = _this;
        _this._wrapper = _this.properties.overlay.hostElement;
        _this._backdrop = _this.properties.overlay.backdropElement;
        _this._container = _this.properties.overlay.overlayElement;
        _this.setProperties();
        _this.setPosition();
        _this.addSubscription(_this.getReference()
            .afterOpen()
            .subscribe(_this.setOpened));
        _this.addSubscription(_this.getReference()
            .afterClosed()
            .subscribe(_this.setClosed));
        _this.addSubscription(_this.events.pipe(filter(function (event) { return event == IWindow.EVENT_CONTENT_READY; })).subscribe(_this.checkSizeAndUpdatePositionIfNeed));
        return _this;
    }
    Window.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
        ViewUtil.addClass(this.container, 'window');
        if (!this.config.isModal) {
            this.container.addEventListener('mousedown', this.mouseDownHandlerProxy);
            this.container.addEventListener('click', this.mouseClickHandlerProxy, true);
        }
    };
    Window.prototype.commitIsBlinkProperties = function () { };
    Window.prototype.commitIsShakingProperties = function () { };
    Window.prototype.commitIsMinimizedProperties = function () { };
    Window.prototype.getConfig = function () {
        return this.properties.config;
    };
    Window.prototype.getContainer = function () {
        return this.container;
    };
    Window.prototype.getReference = function () {
        return this.properties.reference;
    };
    Window.prototype.isNeedClickStopPropagation = function (event) {
        return !this.isWasOnTop;
    };
    Window.prototype.stopBlinkIfNeed = function () {
        this.isBlink = false;
        if (!this.blinkTimer)
            return;
        clearInterval(this.blinkTimer);
        this.blinkTimer = null;
    };
    Window.prototype.mouseDownHandler = function (event) {
        this.setOnTop();
    };
    Window.prototype.mouseClickHandler = function (event) {
        if (this.isNeedClickStopPropagation(event))
            event.stopPropagation();
        if (!this.isWasOnTop)
            this.isWasOnTop = true;
    };
    Window.prototype.emit = function (event) {
        this.observer.next(event);
    };
    Window.prototype.close = function () {
        this.getReference().close();
    };
    Window.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.container.removeEventListener('mousedown', this.mouseDownHandlerProxy);
        this.container.removeEventListener('click', this.mouseClickHandlerProxy, true);
        this._wrapper = null;
        this._backdrop = null;
        this._container = null;
        clearInterval(this.blinkTimer);
        this.blinkTimer = null;
        clearInterval(this.shakeTimer);
        this.shakeTimer = null;
        clearTimeout(this.resizeTimer);
        this.resizeTimer = null;
        this.observer = null;
        this.properties = null;
    };
    Window.prototype.blink = function () {
        clearInterval(this.blinkTimer);
        this.blinkTimer = setInterval(this.blinkToggle, Window.BLINK_DELAY);
    };
    Window.prototype.shake = function () {
        if (this.isShaking)
            return;
        this.isShaking = true;
        clearInterval(this.shakeTimer);
        this.shakeTimer = setInterval(this.stopShaking, Window.SHAKE_DELAY);
    };
    Window.prototype.getWidth = function () {
        return this.width;
    };
    Window.prototype.getHeight = function () {
        return this.height;
    };
    Window.prototype.setWidth = function (value, isNeedNotify) {
        if (isNeedNotify === void 0) { isNeedNotify = true; }
        this.width = value;
        if (isNeedNotify)
            this.resizeHandler();
    };
    Window.prototype.setHeight = function (value, isNeedNotify) {
        if (isNeedNotify === void 0) { isNeedNotify = true; }
        this.height = value;
        if (isNeedNotify)
            this.resizeHandler();
    };
    Window.prototype.setSize = function (width, height) {
        this.setWidth(width, false);
        this.setHeight(height, false);
        this.resizeHandler();
    };
    Window.prototype.getX = function () {
        return this.x;
    };
    Window.prototype.setX = function (value, isNeedNotify) {
        if (isNeedNotify === void 0) { isNeedNotify = true; }
        this.x = value;
        if (isNeedNotify)
            this.emit(IWindow.EVENT_MOVED);
    };
    Window.prototype.getY = function () {
        return this.y;
    };
    Window.prototype.setY = function (value, isNeedNotify) {
        if (isNeedNotify === void 0) { isNeedNotify = true; }
        this.y = value;
        if (isNeedNotify)
            this.emit(IWindow.EVENT_MOVED);
    };
    Window.prototype.move = function (x, y) {
        this.setX(x, false);
        this.setY(y, false);
        this.emit(IWindow.EVENT_MOVED);
    };
    Object.defineProperty(Window.prototype, "isBlink", {
        get: function () {
            return this._isBlink;
        },
        set: function (value) {
            if (value === this._isBlink)
                return;
            this._isBlink = value;
            this.commitIsBlinkProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "isShaking", {
        get: function () {
            return this._isShaking;
        },
        set: function (value) {
            if (value === this._isShaking)
                return;
            this._isShaking = value;
            this.commitIsShakingProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "shakeClassName", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "config", {
        get: function () {
            return this.properties.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "content", {
        get: function () {
            return this.properties.reference ? this.properties.reference.componentInstance : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "wrapper", {
        get: function () {
            return this._wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "backdrop", {
        get: function () {
            return this._backdrop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "isOnTop", {
        get: function () {
            return this._isOnTop;
        },
        set: function (value) {
            if (value === this._isOnTop)
                return;
            this._isOnTop = value;
            clearInterval(this.blinkTimer);
            this.isBlink = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "isMinimized", {
        get: function () {
            return this._isMinimized;
        },
        set: function (value) {
            if (value === this._isMinimized)
                return;
            this._isMinimized = value;
            this.commitIsMinimizedProperties();
            this.emit(IWindow.EVENT_MINIMIZED_CHANGED);
            this.stopBlinkIfNeed();
        },
        enumerable: true,
        configurable: true
    });
    Window.BLINK_DELAY = 500;
    Window.SHAKE_DELAY = 500;
    Window.RESIZE_DELAY = 200;
    return Window;
}(WindowBase));
export { Window };
//# sourceMappingURL=../../../src/window/lib/Window.js.map