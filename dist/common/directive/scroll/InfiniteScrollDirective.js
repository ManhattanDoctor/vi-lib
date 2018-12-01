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
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ScrollDirective } from './ScrollDirective';
var InfiniteScrollDirective = (function (_super) {
    __extends(InfiniteScrollDirective, _super);
    function InfiniteScrollDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top = new EventEmitter();
        _this.bottom = new EventEmitter();
        _this.elementHeight = 50;
        return _this;
    }
    InfiniteScrollDirective.prototype.scrollChangedHandler = function () {
        _super.prototype.scrollChangedHandler.call(this);
        if (!this.isInitialized)
            return;
        var value = this.scrollTop;
        var bottomValue = value + this.clientHeight + this.elementHeight;
        if (bottomValue >= this.scrollHeight)
            this.bottom.next(value);
        else if (value <= this.elementHeight)
            this.top.next(value);
    };
    Object.defineProperty(InfiniteScrollDirective.prototype, "clientHeight", {
        get: function () {
            return this.element.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfiniteScrollDirective.prototype, "scrollHeight", {
        get: function () {
            return this.element.scrollHeight;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], InfiniteScrollDirective.prototype, "top", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], InfiniteScrollDirective.prototype, "bottom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InfiniteScrollDirective.prototype, "elementHeight", void 0);
    InfiniteScrollDirective = __decorate([
        Directive({
            selector: '[vi-infinite-scroll]'
        })
    ], InfiniteScrollDirective);
    return InfiniteScrollDirective;
}(ScrollDirective));
export { InfiniteScrollDirective };
//# sourceMappingURL=../../../../src/common/directive/scroll/InfiniteScrollDirective.js.map