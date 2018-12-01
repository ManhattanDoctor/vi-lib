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
import { WindowConfig } from '../../window/lib/WindowConfig';
var NotificationConfig = (function (_super) {
    __extends(NotificationConfig, _super);
    function NotificationConfig(data, picture) {
        var _this = _super.call(this) || this;
        _this.mode = 'info';
        _this.isRemoveAfterClose = false;
        _this.data = data;
        _this.picture = picture;
        return _this;
    }
    NotificationConfig.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.noCallback = null;
        this.yesCallback = null;
    };
    return NotificationConfig;
}(WindowConfig));
export { NotificationConfig };
//# sourceMappingURL=../../../src/notification/lib/NotificationConfig.js.map