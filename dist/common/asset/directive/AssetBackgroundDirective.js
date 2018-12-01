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
import { Assets } from '../Assets';
var AssetBackgroundDirective = (function () {
    function AssetBackgroundDirective(element) {
        this.element = element;
        this.isUrl = false;
        this.isIcon = false;
        this.isImage = false;
        this.repeat = 'repeat';
        this.extension = 'png';
    }
    AssetBackgroundDirective.prototype.getUrl = function (id, isImage, isIcon, isUrl) {
        if (!id)
            return null;
        if (isUrl)
            return id;
        if (isImage)
            return Assets.getImage(id, this.extension);
        if (isIcon)
            return Assets.getIcon(id, this.extension);
        return Assets.getBackground(id, this.extension);
    };
    AssetBackgroundDirective.prototype.destroy = function () {
        this.element = null;
    };
    AssetBackgroundDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    Object.defineProperty(AssetBackgroundDirective.prototype, "background", {
        get: function () {
            return this._background;
        },
        set: function (value) {
            if (value == this._background)
                return;
            this._background = value;
            var url = this.getUrl(value, this.isImage, this.isIcon, this.isUrl);
            ViewUtil.setBackground(this.element.nativeElement, url, this.repeat);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AssetBackgroundDirective.prototype, "isUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AssetBackgroundDirective.prototype, "isIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AssetBackgroundDirective.prototype, "isImage", void 0);
    __decorate([
        Input('background-repeat'),
        __metadata("design:type", String)
    ], AssetBackgroundDirective.prototype, "repeat", void 0);
    __decorate([
        Input('background-extension'),
        __metadata("design:type", String)
    ], AssetBackgroundDirective.prototype, "extension", void 0);
    __decorate([
        Input('vi-asset-background'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AssetBackgroundDirective.prototype, "background", null);
    AssetBackgroundDirective = __decorate([
        Directive({
            selector: '[vi-asset-background]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AssetBackgroundDirective);
    return AssetBackgroundDirective;
}());
export { AssetBackgroundDirective };
//# sourceMappingURL=../../../../src/common/asset/directive/AssetBackgroundDirective.js.map