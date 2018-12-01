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
import { filter } from 'rxjs/internal/operators';
import { IWindow } from '../../../../window/lib/IWindow';
import { ViewUtil } from '../../../util/ViewUtil';
import { WindowElement } from './WindowElement';
var MinimizeWindowElementComponent = (function (_super) {
    __extends(MinimizeWindowElementComponent, _super);
    function MinimizeWindowElementComponent(element) {
        var _this = _super.call(this, element) || this;
        _this.commitIconProperties = function () {
            var icon = _this.window.isMinimized ? MinimizeWindowElementComponent_1.ICON_MAXIMIZE_VALUE : MinimizeWindowElementComponent_1.ICON_MINIMIZE_VALUE;
            ViewUtil.setProperty(_this.nativeElement, 'innerHTML', icon);
        };
        _this.mouseClickHandler = function (event) {
            event.stopPropagation();
            if (_this.window)
                _this.window.isMinimized = !_this.window.isMinimized;
        };
        return _this;
    }
    MinimizeWindowElementComponent_1 = MinimizeWindowElementComponent;
    MinimizeWindowElementComponent.prototype.commitWindowProperties = function () {
        _super.prototype.commitWindowProperties.call(this);
        this.addSubscription(this.window.events.pipe(filter(function (event) { return event == IWindow.EVENT_MINIMIZED_CHANGED; })).subscribe(this.commitIconProperties));
    };
    MinimizeWindowElementComponent.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        if (MinimizeWindowElementComponent_1.ICON_MINIMIZE_VALUE)
            ViewUtil.setProperty(this.nativeElement, 'innerHTML', MinimizeWindowElementComponent_1.ICON_MINIMIZE_VALUE);
        if (MinimizeWindowElementComponent_1.ICON_CLASS)
            MinimizeWindowElementComponent_1.ICON_CLASS.forEach(function (value) {
                ViewUtil.addClass(_this.nativeElement, value);
            });
        ViewUtil.setStyle(this.nativeElement, 'cursor', 'pointer');
        this.nativeElement.addEventListener('click', this.mouseClickHandler, true);
    };
    MinimizeWindowElementComponent.prototype.destroyChildren = function () {
        _super.prototype.destroyChildren.call(this);
        this.nativeElement.removeEventListener('click', this.mouseClickHandler, true);
    };
    var MinimizeWindowElementComponent_1;
    MinimizeWindowElementComponent.ICON_CLASS = ['material-icons'];
    MinimizeWindowElementComponent.ICON_MINIMIZE_VALUE = 'arrow_drop_up';
    MinimizeWindowElementComponent.ICON_MAXIMIZE_VALUE = 'arrow_drop_down';
    MinimizeWindowElementComponent = MinimizeWindowElementComponent_1 = __decorate([
        Component({
            selector: 'minimize-window-element',
            styleUrls: ['icon-window-element.component.scss'],
            template: ''
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MinimizeWindowElementComponent);
    return MinimizeWindowElementComponent;
}(WindowElement));
export { MinimizeWindowElementComponent };
//# sourceMappingURL=../../../../../src/common/component/window/element/minimize-window-element.component.js.map