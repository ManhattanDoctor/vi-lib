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
import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '../../../util/ViewUtil';
import { WindowElement } from './WindowElement';
var CloseWindowElementComponent = (function (_super) {
    __extends(CloseWindowElementComponent, _super);
    function CloseWindowElementComponent(element) {
        var _this = _super.call(this, element) || this;
        _this.mouseClickHandler = function (event) {
            event.stopPropagation();
            if (_this.window)
                _this.window.close();
        };
        return _this;
    }
    CloseWindowElementComponent_1 = CloseWindowElementComponent;
    CloseWindowElementComponent.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        if (CloseWindowElementComponent_1.ICON_VALUE)
            ViewUtil.setProperty(this.nativeElement, 'innerHTML', CloseWindowElementComponent_1.ICON_VALUE);
        if (CloseWindowElementComponent_1.ICON_CLASS)
            CloseWindowElementComponent_1.ICON_CLASS.forEach(function (value) {
                ViewUtil.addClass(_this.nativeElement, value);
            });
        ViewUtil.setStyle(this.nativeElement, 'cursor', 'pointer');
        this.nativeElement.addEventListener('click', this.mouseClickHandler, true);
    };
    CloseWindowElementComponent.prototype.destroyChildren = function () {
        _super.prototype.destroyChildren.call(this);
        this.nativeElement.removeEventListener('click', this.mouseClickHandler, true);
    };
    var CloseWindowElementComponent_1;
    CloseWindowElementComponent.ICON_CLASS = ['material-icons'];
    CloseWindowElementComponent.ICON_VALUE = 'close';
    CloseWindowElementComponent = CloseWindowElementComponent_1 = __decorate([
        Component({
            selector: 'close-window-element',
            styleUrls: ['icon-window-element.component.scss'],
            template: ''
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], CloseWindowElementComponent);
    return CloseWindowElementComponent;
}(WindowElement));
export { CloseWindowElementComponent };
//# sourceMappingURL=../../../../../src/common/component/window/element/close-window-element.component.js.map