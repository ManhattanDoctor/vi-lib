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
import { DestroyableContainer } from '../container/DestroyableContainer';
var DestroyableComponent = (function (_super) {
    __extends(DestroyableComponent, _super);
    function DestroyableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DestroyableComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    DestroyableComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return DestroyableComponent;
}(DestroyableContainer));
export { DestroyableComponent };
//# sourceMappingURL=../../../src/common/component/DestroyableComponent.js.map