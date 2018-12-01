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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HostListener } from '@angular/core';
import { INotificationContent } from '../../../notification/lib/INotificationContent';
import { IQuestion } from '../../IQuestion';
var NotificationBaseComponent = (function (_super) {
    __extends(NotificationBaseComponent, _super);
    function NotificationBaseComponent(container, language) {
        return _super.call(this, container, language) || this;
    }
    NotificationBaseComponent.prototype.clickHandler = function () {
        if (this.mode == 'info')
            this.remove();
    };
    NotificationBaseComponent.prototype.yesClickHandler = function () {
        if (this.config && this.config.yesCallback)
            this.config.yesCallback();
        this.promiseResolve();
        this.emit(IQuestion.EVENT_YES);
        this.remove();
    };
    NotificationBaseComponent.prototype.notClickHandler = function () {
        if (this.config && this.config.noCallback)
            this.config.noCallback();
        this.promiseReject('No clicked');
        this.emit(IQuestion.EVENT_NOT);
        this.remove();
    };
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NotificationBaseComponent.prototype, "clickHandler", null);
    return NotificationBaseComponent;
}(INotificationContent));
export { NotificationBaseComponent };
//# sourceMappingURL=../../../../src/common/component/notification/NotificationBaseComponent.js.map