var ValueAccessor = (function () {
    function ValueAccessor() {
        this.changed = new Array();
        this.touched = new Array();
    }
    ValueAccessor.prototype.valueChanged = function () {
        var _this = this;
        this.changed.forEach(function (f) { return f(_this.innerValue); });
    };
    Object.defineProperty(ValueAccessor.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (value) {
            if (value == this.innerValue)
                return;
            this.innerValue = value;
            this.valueChanged();
        },
        enumerable: true,
        configurable: true
    });
    ValueAccessor.prototype.touch = function () {
        this.touched.forEach(function (f) { return f(); });
    };
    ValueAccessor.prototype.writeValue = function (value) {
        this.value = value;
    };
    ValueAccessor.prototype.registerOnChange = function (fn) {
        this.changed.push(fn);
    };
    ValueAccessor.prototype.registerOnTouched = function (fn) {
        this.touched.push(fn);
    };
    return ValueAccessor;
}());
export { ValueAccessor };
//# sourceMappingURL=../../../../src/common/component/form/ValueAccessor.js.map