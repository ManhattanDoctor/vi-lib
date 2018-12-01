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
import { AssetBackgroundDirective } from '../asset/directive/AssetBackgroundDirective';
import { DestroyableComponent } from './DestroyableComponent';
var BackgroundComponent = (function (_super) {
    __extends(BackgroundComponent, _super);
    function BackgroundComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        return _this;
    }
    BackgroundComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.element = null;
        if (this.directive) {
            this.directive.destroy();
            this.directive = null;
        }
    };
    Object.defineProperty(BackgroundComponent.prototype, "background", {
        get: function () {
            return this.directive ? this.directive.background : null;
        },
        set: function (value) {
            if (value && !this.directive)
                this.directive = new AssetBackgroundDirective(this.element);
            if (this.directive)
                this.directive.background = value;
        },
        enumerable: true,
        configurable: true
    });
    return BackgroundComponent;
}(DestroyableComponent));
export { BackgroundComponent };
//# sourceMappingURL=../../../src/common/component/BackgroundComponent.js.map