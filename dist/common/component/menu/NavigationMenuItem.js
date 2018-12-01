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
import { MenuItem } from './MenuItem';
var NavigationMenuItem = (function (_super) {
    __extends(NavigationMenuItem, _super);
    function NavigationMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isActive = false;
        return _this;
    }
    return NavigationMenuItem;
}(MenuItem));
export { NavigationMenuItem };
//# sourceMappingURL=../../../../src/common/component/menu/NavigationMenuItem.js.map