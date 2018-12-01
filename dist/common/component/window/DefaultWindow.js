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
import { DragableWindow } from '../../../window/lib/window/DragableWindow';
import { APPLICATION_INJECTOR } from '../../ApplicationInjector';
import { ViewUtil } from '../../util/ViewUtil';
import { CloseWindowElementComponent } from './element/close-window-element.component';
import { MinimizeWindowElementComponent } from './element/minimize-window-element.component';
import { ResizeWindowElementComponent } from './element/resize-window-element.component';
var DefaultWindow = (function (_super) {
    __extends(DefaultWindow, _super);
    function DefaultWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultWindow.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
        if (!this.config.disableClose && !this.closeWindow) {
            var factory = this.resolver.resolveComponentFactory(CloseWindowElementComponent);
            this.closeWindow = this.content.container.createComponent(factory);
            this.closeWindow.instance.window = this;
        }
        if (this.config.isResizeable && !this.resizedWindow) {
            var factory = this.resolver.resolveComponentFactory(ResizeWindowElementComponent);
            this.resizedWindow = this.content.container.createComponent(factory);
        }
        if (this.config.isMinimizable && !this.minimizeWindow) {
            var factory = this.resolver.resolveComponentFactory(MinimizeWindowElementComponent);
            this.minimizeWindow = this.content.container.createComponent(factory);
            this.minimizeWindow.instance.window = this;
        }
    };
    DefaultWindow.prototype.commitIsBlinkProperties = function () {
        ViewUtil.toggleClass(this.container, 'blink', this.isBlink);
    };
    DefaultWindow.prototype.commitIsShakingProperties = function () {
        ViewUtil.toggleClass(this.container, 'shake-constant', this.isShaking);
        ViewUtil.toggleClass(this.container, 'shake-horizontal', this.isShaking);
    };
    DefaultWindow.prototype.commitIsMinimizedProperties = function () {
        ViewUtil.toggleClass(this.container, 'minimized', this.isMinimized);
        ViewUtil.toggleClass(this.content.element, 'minimized', this.isMinimized);
        ViewUtil.toggleClass(this.content.element.nativeElement.parentElement, 'minimized', this.isMinimized);
    };
    DefaultWindow.prototype.isNeedClickStopPropagation = function (event) {
        if (!_super.prototype.isNeedClickStopPropagation.call(this, event))
            return false;
        if (this.closeWindow && this.closeWindow.location.nativeElement == event.target)
            return false;
        return true;
    };
    Object.defineProperty(DefaultWindow.prototype, "resolver", {
        get: function () {
            return APPLICATION_INJECTOR().get(ComponentFactoryResolver);
        },
        enumerable: true,
        configurable: true
    });
    DefaultWindow.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.closeWindow) {
            this.closeWindow.destroy();
            this.closeWindow = null;
        }
        if (this.resizedWindow) {
            this.resizedWindow.destroy();
            this.resizedWindow = null;
        }
        if (this.minimizeWindow) {
            this.minimizeWindow.destroy();
            this.minimizeWindow = null;
        }
    };
    return DefaultWindow;
}(DragableWindow));
export { DefaultWindow };
//# sourceMappingURL=../../../../src/common/component/window/DefaultWindow.js.map