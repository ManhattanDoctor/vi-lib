var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, Output, ElementRef, Input, HostListener } from '@angular/core';
var ScrollDirective = (function () {
    function ScrollDirective(element) {
        var _this = this;
        this.scrolled = new EventEmitter();
        this.scrolledDelay = 100;
        this.isInitialized = false;
        this._scrollValue = 0;
        this.scrollChanged = function () {
            _this.scrollChangedHandler();
        };
        this.initializeHandler = function () {
            _this.initialize();
        };
        this.element = element.nativeElement;
        this.timer = setTimeout(this.initializeHandler, ScrollDirective_1.INITIALIZATION_DELAY);
    }
    ScrollDirective_1 = ScrollDirective;
    ScrollDirective.prototype.initialize = function () {
        if (this.scrollValue)
            this.scrollTo(this.scrollValue);
        this.isInitialized = true;
    };
    ScrollDirective.prototype.scrollTo = function (value) {
        this._scrollValue = value;
        this.element.scrollTop = value;
    };
    ScrollDirective.prototype.scrollHandler = function () {
        if (!this.isInitialized)
            return;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.scrollChanged, this.scrolledDelay);
    };
    ScrollDirective.prototype.scrollChangedHandler = function () {
        this._scrollValue = this.scrollTop;
        this.scrolled.next(this._scrollValue);
    };
    Object.defineProperty(ScrollDirective.prototype, "scrollTop", {
        get: function () {
            return this.element.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    ScrollDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    ScrollDirective.prototype.destroy = function () {
        this.element = null;
        this.isInitialized = false;
        this._scrollValue = 0;
        clearTimeout(this.timer);
        this.timer = null;
    };
    Object.defineProperty(ScrollDirective.prototype, "scrollValue", {
        get: function () {
            return this._scrollValue;
        },
        set: function (value) {
            if (value == this._scrollValue || isNaN(value))
                return;
            this._scrollValue = value;
            if (this.isInitialized)
                this.scrollTo(value);
        },
        enumerable: true,
        configurable: true
    });
    var ScrollDirective_1;
    ScrollDirective.INITIALIZATION_DELAY = 1;
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScrollDirective.prototype, "scrolled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ScrollDirective.prototype, "scrolledDelay", void 0);
    __decorate([
        HostListener('scroll'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScrollDirective.prototype, "scrollHandler", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ScrollDirective.prototype, "scrollValue", null);
    ScrollDirective = ScrollDirective_1 = __decorate([
        Directive({
            selector: '[vi-scroll]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ScrollDirective);
    return ScrollDirective;
}());
export { ScrollDirective };
//# sourceMappingURL=../../../../src/common/directive/scroll/ScrollDirective.js.map