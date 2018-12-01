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
import { QuestionBaseComponent } from '../../common/component/window/QuestionBaseComponent';
import { INotification } from './INotification';
var INotificationContent = (function (_super) {
    __extends(INotificationContent, _super);
    function INotificationContent(container, language) {
        var _this = _super.call(this, container, language) || this;
        _this.language = language;
        _this.timerHandler = function () {
            _this.handleCloseClick();
        };
        return _this;
    }
    INotificationContent.prototype.commitNotificationProperties = function () {
        if (!this.config)
            return;
        this.text = this.config.data;
        this.mode = this.config.mode;
        if (this.config.closeDuration) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.timerHandler, this.config.closeDuration);
        }
    };
    INotificationContent.prototype.close = function () {
        if (this.notification)
            this.notification.close();
    };
    INotificationContent.prototype.remove = function () {
        if (this.notification)
            this.notification.remove();
    };
    INotificationContent.prototype.emit = function (event) {
        if (this.notification)
            this.notification.emit(event);
    };
    INotificationContent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.notification = null;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    INotificationContent.prototype.ngAfterViewInit = function () {
        this.emit(INotification.EVENT_CONTENT_READY);
    };
    INotificationContent.prototype.handleCloseClick = function () {
        if (this.timer)
            clearTimeout(this.timer);
        if (this.config && this.config.isRemoveAfterClose)
            this.remove();
        else
            this.close();
    };
    Object.defineProperty(INotificationContent.prototype, "data", {
        get: function () {
            return this.config ? this.config.data : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(INotificationContent.prototype, "config", {
        get: function () {
            return this.notification ? this.notification.config : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(INotificationContent.prototype, "notification", {
        get: function () {
            return this._notification;
        },
        set: function (value) {
            if (value == this._notification)
                return;
            this._notification = value;
            if (this._notification)
                this.commitNotificationProperties();
        },
        enumerable: true,
        configurable: true
    });
    return INotificationContent;
}(QuestionBaseComponent));
export { INotificationContent };
//# sourceMappingURL=../../../src/notification/lib/INotificationContent.js.map