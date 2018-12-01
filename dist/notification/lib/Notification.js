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
import { WindowBase } from '../../window/lib/WindowBase';
import { INotification } from './INotification';
var Notification = (function (_super) {
    __extends(Notification, _super);
    function Notification(reference, config, overlay) {
        var _this = _super.call(this) || this;
        _this.setClosed = function () {
            _this.emit(INotification.EVENT_CLOSED);
            _this.destroy();
        };
        _this.setOpened = function () {
            _this.emit(INotification.EVENT_OPENED);
        };
        _this.observer = new Subject();
        _this._config = config;
        _this._overlay = overlay;
        _this._reference = reference;
        _this.content.notification = _this;
        _this.setProperties();
        _this.setPosition();
        _this.addSubscription(reference.afterOpen().subscribe(_this.setOpened));
        _this.addSubscription(reference.afterClosed().subscribe(_this.setClosed));
        _this.addSubscription(_this.observer.pipe(filter(function (event) { return event == INotification.EVENT_CONTENT_READY; })).subscribe(_this.checkSizeAndUpdatePositionIfNeed));
        return _this;
    }
    Notification.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
        ViewUtil.addClass(this.container, 'notification');
    };
    Notification.prototype.getConfig = function () {
        return this._config;
    };
    Notification.prototype.getContainer = function () {
        return this.container;
    };
    Notification.prototype.getReference = function () {
        return this._reference;
    };
    Notification.prototype.emit = function (event) {
        this.observer.next(event);
    };
    Notification.prototype.close = function () {
        if (this._reference)
            this._reference.close();
    };
    Notification.prototype.remove = function () {
        this.close();
        this.observer.next(INotification.EVENT_REMOVED);
    };
    Notification.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.observer = null;
        this._reference = null;
        this._overlay = null;
        this._config = null;
    };
    Notification.prototype.getWidth = function () {
        return this.width;
    };
    Notification.prototype.getHeight = function () {
        return this.height;
    };
    Notification.prototype.setWidth = function (value) {
        this.width = value;
    };
    Notification.prototype.setHeight = function (value) {
        this.height = value;
    };
    Notification.prototype.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };
    Notification.prototype.getX = function () {
        return this.x;
    };
    Notification.prototype.setX = function (value) {
        this.x = value;
    };
    Notification.prototype.getY = function () {
        return this.y;
    };
    Notification.prototype.setY = function (value) {
        this.y = value;
    };
    Notification.prototype.move = function (x, y) {
        this.setX(x);
        this.setY(y);
    };
    Object.defineProperty(Notification.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "content", {
        get: function () {
            return this._reference.componentInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "container", {
        get: function () {
            return this._overlay.overlayElement;
        },
        enumerable: true,
        configurable: true
    });
    Notification.OPEN_DELAY = 1;
    return Notification;
}(WindowBase));
export { Notification };
//# sourceMappingURL=../../../src/notification/lib/Notification.js.map