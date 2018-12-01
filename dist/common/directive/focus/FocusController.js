import { ViewUtil } from '../../util/ViewUtil';
var FocusController = (function () {
    function FocusController(element) {
        var _this = this;
        this.focusElement = function () {
            if (_this.element)
                ViewUtil.focusInput(_this.element.nativeElement);
        };
        this.element = element;
    }
    FocusController.prototype.focus = function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.focusElement, ViewUtil.FOCUS_DELAY);
    };
    FocusController.prototype.destroy = function () {
        this.element = null;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    return FocusController;
}());
export { FocusController };
//# sourceMappingURL=../../../../src/common/directive/focus/FocusController.js.map