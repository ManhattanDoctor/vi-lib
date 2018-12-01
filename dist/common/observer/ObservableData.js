var ObservableData = (function () {
    function ObservableData(type, data, error) {
        this._type = type;
        this._data = data;
        this._error = error;
    }
    Object.defineProperty(ObservableData.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObservableData.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObservableData.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    return ObservableData;
}());
export { ObservableData };
//# sourceMappingURL=../../../src/common/observer/ObservableData.js.map