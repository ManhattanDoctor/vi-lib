var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Assets } from '../../common/asset/Assets';
import { StringUtil } from '../../common/util/StringUtil';
import { ThemeService, ThemeServiceEvent } from '../service/ThemeService';
var ThemeAssetDirective = (function () {
    function ThemeAssetDirective(element, theme) {
        this.theme = theme;
        this.isImage = false;
        this.isBackground = false;
        this.extension = 'png';
        this.element = element.nativeElement;
    }
    ThemeAssetDirective.prototype.getSource = function (id) {
        if (!id)
            return null;
        if (this.isImage)
            return Assets.getImage(id, this.extension);
        if (this.isBackground)
            return Assets.getBackground(id, this.extension);
        return Assets.getIcon(id, this.extension);
    };
    ThemeAssetDirective.prototype.errorLoadingHandler = function (event) {
        this.errorHandler(event);
    };
    ThemeAssetDirective.prototype.errorHandler = function (event) {
        if (this.isTriedThemeDefault)
            return;
        this.isTriedThemeDefault = true;
        this.source = this.getSource(this.getDefaultSourceId(this.theme.theme));
        this.commitSourceProperties();
    };
    ThemeAssetDirective.prototype.updateSourceProperties = function () {
        this.source = this.getSource(this.getSourceId(this.theme.theme));
        this.commitSourceProperties();
    };
    ThemeAssetDirective.prototype.getSourceId = function (theme) {
        return this.name + StringUtil.capitalizeFirstLetter(theme.name);
    };
    ThemeAssetDirective.prototype.getDefaultSourceId = function (theme) {
        var value = this.name;
        value += theme.isDark ? 'Dark' : 'Light';
        return value;
    };
    ThemeAssetDirective.prototype.commitSourceProperties = function () { };
    ThemeAssetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.updateSourceProperties();
        this.subscription = this.theme.events.subscribe(function (event) {
            if (event === ThemeServiceEvent.CHANGED) {
                _this.isTriedThemeDefault = false;
                _this.updateSourceProperties();
            }
        });
    };
    ThemeAssetDirective.prototype.ngOnDestroy = function () {
        this.theme = null;
        this.element = null;
        this.subscription.unsubscribe();
        this.subscription = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ThemeAssetDirective.prototype, "isImage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ThemeAssetDirective.prototype, "isBackground", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ThemeAssetDirective.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ThemeAssetDirective.prototype, "extension", void 0);
    __decorate([
        HostListener('error', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ThemeAssetDirective.prototype, "errorLoadingHandler", null);
    ThemeAssetDirective = __decorate([
        Directive({
            selector: '[theme-asset]'
        }),
        __metadata("design:paramtypes", [ElementRef, ThemeService])
    ], ThemeAssetDirective);
    return ThemeAssetDirective;
}());
export { ThemeAssetDirective };
//# sourceMappingURL=../../../src/theme/directive/ThemeAssetDirective.js.map