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
import { ViewUtil } from '../../util/ViewUtil';
var FocusDirective = (function () {
    function FocusDirective(element) {
        var _this = this;
        this.element = element;
        this.focus = function () {
            ViewUtil.focusInput(_this.element.nativeElement);
        };
    }
    FocusDirective_1 = FocusDirective;
    FocusDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
        this.timer = null;
    };
    Object.defineProperty(FocusDirective.prototype, "trigger", {
        set: function (value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.focus, FocusDirective_1.DELAY);
        },
        enumerable: true,
        configurable: true
    });
    var FocusDirective_1;
    FocusDirective.DELAY = 100;
    __decorate([
        Input('vi-focus'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FocusDirective.prototype, "trigger", null);
    FocusDirective = FocusDirective_1 = __decorate([
        Directive({
            selector: '[vi-focus]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
//# sourceMappingURL=../../../../src/common/directive/focus/FocusDirective.js.map