var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input } from '@angular/core';
import { IWindow } from '../lib/IWindow';
var WindowDragAreaDirective = (function () {
    function WindowDragAreaDirective(element) {
        var _this = this;
        this.element = element;
        this.dragStartHandler = function (event) {
            _this._window.dragStartHandler(event);
        };
        this.dragMoveHandler = function (event) {
            _this._window.dragMoveHandler(event);
        };
    }
    WindowDragAreaDirective.prototype.destroy = function () {
        if (this._interactable) {
            interact(this.element.nativeElement).unset();
            this._interactable = null;
        }
        this.element = null;
    };
    WindowDragAreaDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    WindowDragAreaDirective.prototype.commitWindowProperties = function () {
        if (!this.window.config || this.window.config.isModal)
            return;
        this.interactable.draggable(true);
        this.interactable.on('dragmove', this.dragMoveHandler);
        this.interactable.on('dragstart', this.dragStartHandler);
    };
    Object.defineProperty(WindowDragAreaDirective.prototype, "interactable", {
        get: function () {
            if (!this._interactable) {
                this._interactable = interact(this.element.nativeElement);
                this._interactable.styleCursor(false);
            }
            return this._interactable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowDragAreaDirective.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (value) {
            if (value == this._window)
                return;
            this._window = value;
            if (this._window)
                this.commitWindowProperties();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input('vi-window-drag-area'),
        __metadata("design:type", IWindow),
        __metadata("design:paramtypes", [IWindow])
    ], WindowDragAreaDirective.prototype, "window", null);
    WindowDragAreaDirective = __decorate([
        Directive({
            selector: '[vi-window-drag-area]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], WindowDragAreaDirective);
    return WindowDragAreaDirective;
}());
export { WindowDragAreaDirective };
//# sourceMappingURL=../../../src/window/directive/WindowDragAreaDirective.js.map