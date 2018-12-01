var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener } from '@angular/core';
import { ViewUtil } from '../util/ViewUtil';
var ClickToSelectDirective = (function () {
    function ClickToSelectDirective(element) {
        this.element = element.nativeElement;
    }
    ClickToSelectDirective.prototype.clickHandler = function (event) {
        if (event.detail >= 3)
            ViewUtil.selectContent(this.element, true);
    };
    ClickToSelectDirective.prototype.ngOnDestroy = function () {
        this.element = null;
    };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ClickToSelectDirective.prototype, "clickHandler", null);
    ClickToSelectDirective = __decorate([
        Directive({
            selector: '[vi-click-to-select]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ClickToSelectDirective);
    return ClickToSelectDirective;
}());
export { ClickToSelectDirective };
//# sourceMappingURL=../../../src/common/directive/ClickToSelectDirective.js.map