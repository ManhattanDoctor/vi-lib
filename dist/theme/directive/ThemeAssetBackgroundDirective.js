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
import { Directive, ElementRef } from '@angular/core';
import { ViewUtil } from '../../common/util/ViewUtil';
import { ThemeService } from '../service/ThemeService';
import { ThemeAssetDirective } from './ThemeAssetDirective';
var ThemeAssetBackgroundDirective = (function (_super) {
    __extends(ThemeAssetBackgroundDirective, _super);
    function ThemeAssetBackgroundDirective(element, theme) {
        return _super.call(this, element, theme) || this;
    }
    ThemeAssetBackgroundDirective.prototype.commitSourceProperties = function () {
        var value = 'url(' + this.source + ')';
        ViewUtil.setStyle(this.element, 'backgroundImage', value);
    };
    ThemeAssetBackgroundDirective = __decorate([
        Directive({
            selector: '[theme-background]'
        }),
        __metadata("design:paramtypes", [ElementRef, ThemeService])
    ], ThemeAssetBackgroundDirective);
    return ThemeAssetBackgroundDirective;
}(ThemeAssetDirective));
export { ThemeAssetBackgroundDirective };
//# sourceMappingURL=../../../src/theme/directive/ThemeAssetBackgroundDirective.js.map