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
import { ResizeController } from './ResizeController';
var AspectRatioResizeDirective = (function () {
    function AspectRatioResizeDirective(element) {
        var _this = this;
        this._ratio = NaN;
        this.commitResizeProperties = function () {
            if (_this._direction == 'horizontal')
                _this.width = _this.height / _this.ratio;
            else if (_this._direction == 'vertical')
                _this.height = _this.width * _this.ratio;
        };
        this.element = element.nativeElement;
    }
    AspectRatioResizeDirective_1 = AspectRatioResizeDirective;
    AspectRatioResizeDirective.prototype.ngAfterViewInit = function () {
        this.sensor = new ResizeController(this.element, this.commitResizeProperties, AspectRatioResizeDirective_1.UPDATE_DELAY);
        if (isNaN(this.ratio))
            this.ratio = ViewUtil.VIDEO_RATIO;
    };
    AspectRatioResizeDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    AspectRatioResizeDirective.prototype.destroy = function () {
        this.element = null;
        if (this.sensor) {
            this.sensor.destroy();
            this.sensor = null;
        }
    };
    Object.defineProperty(AspectRatioResizeDirective.prototype, "width", {
        get: function () {
            return ViewUtil.getWidth(this.element);
        },
        set: function (value) {
            ViewUtil.setWidth(this.element, value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AspectRatioResizeDirective.prototype, "height", {
        get: function () {
            return ViewUtil.getHeight(this.element);
        },
        set: function (value) {
            ViewUtil.setHeight(this.element, value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AspectRatioResizeDirective.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            if (value == this._direction || !value)
                return;
            this._direction = value;
            this.commitResizeProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AspectRatioResizeDirective.prototype, "ratio", {
        get: function () {
            return this._ratio;
        },
        set: function (value) {
            if (value == this._ratio)
                return;
            this._ratio = value;
            this.commitResizeProperties();
        },
        enumerable: true,
        configurable: true
    });
    var AspectRatioResizeDirective_1;
    AspectRatioResizeDirective.UPDATE_DELAY = 100;
    __decorate([
        Input('vi-aspect-ratio'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AspectRatioResizeDirective.prototype, "direction", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AspectRatioResizeDirective.prototype, "ratio", null);
    AspectRatioResizeDirective = AspectRatioResizeDirective_1 = __decorate([
        Directive({
            selector: '[vi-aspect-ratio]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AspectRatioResizeDirective);
    return AspectRatioResizeDirective;
}());
export { AspectRatioResizeDirective };
//# sourceMappingURL=../../../../src/common/directive/resize/AspectRatioResizeDirective.js.map