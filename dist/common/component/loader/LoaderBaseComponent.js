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
import { Input } from '@angular/core';
import { ViewUtil } from '../../util/ViewUtil';
import { DestroyableComponent } from '../DestroyableComponent';
var LoaderBaseComponent = (function (_super) {
    __extends(LoaderBaseComponent, _super);
    function LoaderBaseComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this._isBlock = false;
        _this._isEmpty = false;
        _this._isLoading = false;
        return _this;
    }
    Object.defineProperty(LoaderBaseComponent.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (value == this._isLoading)
                return;
            this._isLoading = value;
            ViewUtil.toggleClass(this.element, 'loading', this.isLoading);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderBaseComponent.prototype, "isEmpty", {
        get: function () {
            return this._isEmpty;
        },
        set: function (value) {
            if (value == this._isEmpty)
                return;
            this._isEmpty = value;
            ViewUtil.toggleClass(this.element, 'empty', this.isEmpty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderBaseComponent.prototype, "isBlock", {
        get: function () {
            return this._isBlock;
        },
        set: function (value) {
            if (value == this._isBlock)
                return;
            this._isBlock = value;
            ViewUtil.toggleClass(this.element, 'block', this.isBlock);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LoaderBaseComponent.prototype, "emptyText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LoaderBaseComponent.prototype, "loadingText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], LoaderBaseComponent.prototype, "isLoading", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], LoaderBaseComponent.prototype, "isEmpty", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], LoaderBaseComponent.prototype, "isBlock", null);
    return LoaderBaseComponent;
}(DestroyableComponent));
export { LoaderBaseComponent };
//# sourceMappingURL=../../../../src/common/component/loader/LoaderBaseComponent.js.map