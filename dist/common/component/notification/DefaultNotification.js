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
import { ComponentFactoryResolver } from '@angular/core';
import { Notification } from '../../../notification/lib/Notification';
import { APPLICATION_INJECTOR } from '../../ApplicationInjector';
var DefaultNotification = (function (_super) {
    __extends(DefaultNotification, _super);
    function DefaultNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultNotification.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
    };
    Object.defineProperty(DefaultNotification.prototype, "resolver", {
        get: function () {
            return APPLICATION_INJECTOR().get(ComponentFactoryResolver);
        },
        enumerable: true,
        configurable: true
    });
    return DefaultNotification;
}(Notification));
export { DefaultNotification };
//# sourceMappingURL=../../../../src/common/component/notification/DefaultNotification.js.map