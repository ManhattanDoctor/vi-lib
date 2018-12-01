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
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { InfiniteScrollDirective } from './InfiniteScrollDirective';
var AutoBottomScrollDirective = (function (_super) {
    __extends(AutoBottomScrollDirective, _super);
    function AutoBottomScrollDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.triggerChanged = new EventEmitter();
        _this.triggerDelta = 0;
        _this.isScrollLocked = false;
        _this.isNeedScroll = true;
        _this.isNeedRemainScroll = false;
        _this.checkTrigger = function () {
            _this.isScrollLocked = false;
            if (_this.isNeedScroll) {
                _this.scrollBottom();
            }
            else if (_this.isNeedRemainScroll) {
                _this.scrollRemain();
            }
            else if (_this.triggerDelta > 0) {
                _this.triggerDelta = 0;
                _this.triggerChanged.emit();
            }
        };
        return _this;
    }
    AutoBottomScrollDirective.prototype.initialize = function () {
        if (!this._scrollValue)
            this._scrollValue = this.scrollHeight;
        _super.prototype.initialize.call(this);
    };
    AutoBottomScrollDirective.prototype.scrollRemain = function () {
        this.isNeedRemainScroll = false;
        this.scrollTo(this.scrollHeight - this.lastScrollHeight);
    };
    AutoBottomScrollDirective.prototype.scrollBottom = function () {
        this.scrollTo(this.scrollHeight);
    };
    AutoBottomScrollDirective.prototype.scrollChangedHandler = function () {
        _super.prototype.scrollChangedHandler.call(this);
        if (!this.isInitialized || this.isScrollLocked)
            return;
        var value = this.scrollTop;
        var bottomValue = value + this.clientHeight + this.elementHeight;
        this.isNeedScroll = bottomValue >= this.scrollHeight;
        this.isNeedRemainScroll = value <= this.elementHeight;
        if (this.isNeedRemainScroll)
            this.lastScrollHeight = this.scrollHeight;
    };
    AutoBottomScrollDirective.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        clearTimeout(this.triggerTimer);
        this.triggerTimer = null;
        this.trigger = null;
    };
    Object.defineProperty(AutoBottomScrollDirective.prototype, "trigger", {
        set: function (value) {
            if (value == this._trigger)
                return;
            if (!isNaN(this._trigger) && !isNaN(value))
                this.triggerDelta = value - this._trigger;
            this._trigger = value;
            if (!this.isInitialized)
                return;
            this.isScrollLocked = true;
            clearTimeout(this.triggerTimer);
            this.triggerTimer = setTimeout(this.checkTrigger, InfiniteScrollDirective.INITIALIZATION_DELAY);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoBottomScrollDirective.prototype, "triggerChanged", void 0);
    __decorate([
        Input('vi-auto-bottom-scroll'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AutoBottomScrollDirective.prototype, "trigger", null);
    AutoBottomScrollDirective = __decorate([
        Directive({
            selector: '[vi-auto-bottom-scroll]'
        })
    ], AutoBottomScrollDirective);
    return AutoBottomScrollDirective;
}(InfiniteScrollDirective));
export { AutoBottomScrollDirective };
//# sourceMappingURL=../../../../src/common/directive/scroll/AutoBottomScrollDirective.js.map