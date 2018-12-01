var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
var ResizeDirective = (function () {
    function ResizeDirective(element) {
        var _this = this;
        this.resize = new EventEmitter();
        this.isTop = false;
        this.isLeft = false;
        this.isRight = false;
        this.isBottom = false;
        this.resizeHandler = function (event) {
            if (event.dx != 0 || event.dy != 0)
                _this.resize.emit(event);
        };
        this.interactable = interact(element.nativeElement);
        this.interactable.styleCursor(false);
        var param = {};
        param.top = this.isTop;
        param.left = this.isLeft;
        param.right = this.isRight;
        param.bottom = this.isBottom;
        this.interactable.resizable(param);
        this.interactable.on('resizemove', this.resizeHandler);
    }
    ResizeDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    ResizeDirective.prototype.destroy = function () {
        this.interactable.unset();
        this.interactable = null;
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResizeDirective.prototype, "resize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResizeDirective.prototype, "isTop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResizeDirective.prototype, "isLeft", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResizeDirective.prototype, "isRight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResizeDirective.prototype, "isBottom", void 0);
    ResizeDirective = __decorate([
        Directive({
            selector: '[vi-resize]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ResizeDirective);
    return ResizeDirective;
}());
export { ResizeDirective };
//# sourceMappingURL=../../../../src/common/directive/resize/ResizeDirective.js.map