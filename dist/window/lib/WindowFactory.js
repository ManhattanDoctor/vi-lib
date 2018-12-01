import { WindowConfig } from './WindowConfig';
var WindowFactory = (function () {
    function WindowFactory(classType) {
        this.classType = classType;
    }
    WindowFactory.prototype.create = function (properties) {
        var window = new this.classType(properties);
        return window;
    };
    WindowFactory.prototype.createConfig = function (isModal, isResizeable, width, height) {
        if (isModal === void 0) { isModal = false; }
        if (isResizeable === void 0) { isResizeable = false; }
        if (width === void 0) { width = NaN; }
        if (height === void 0) { height = NaN; }
        return new WindowConfig(isModal, isResizeable, width, height);
    };
    return WindowFactory;
}());
export { WindowFactory };
//# sourceMappingURL=../../../src/window/lib/WindowFactory.js.map