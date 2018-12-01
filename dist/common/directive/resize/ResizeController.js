var ResizeController = (function () {
    function ResizeController(element, handler, delay, isForceResize) {
        if (delay === void 0) { delay = 0; }
        if (isForceResize === void 0) { isForceResize = false; }
        var _this = this;
        this.element = element;
        this.handler = handler;
        this.delay = delay;
        this.isForceResize = isForceResize;
        this.initialize = function () {
            _this.sensor = new ResizeSensor(_this.element, _this.resizeHandler);
            if (_this.isForceResize)
                _this.resizeHandler();
        };
        this.callHandler = function () {
            _this.handler();
        };
        this.resizeHandler = function () {
            if (isNaN(_this.delay) || _this.delay <= 0) {
                _this.callHandler();
                return;
            }
            clearTimeout(_this.timer);
            _this.timer = setTimeout(_this.callHandler, _this.delay);
        };
        this.timer = setTimeout(this.initialize);
    }
    ResizeController.prototype.destroy = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.sensor) {
            this.sensor.detach(this.resizeHandler);
            this.sensor = null;
        }
        this.handler = null;
        this.element = null;
    };
    return ResizeController;
}());
export { ResizeController };
//# sourceMappingURL=../../../../src/common/directive/resize/ResizeController.js.map