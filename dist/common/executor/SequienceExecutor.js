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
import { Loadable, LoadableEvent, LoadableStatus } from '../lib/Loadable';
import { ObservableData } from '../observer/ObservableData';
import { ArrayUtil } from '../util/ArrayUtil';
var SequienceExecutor = (function (_super) {
    __extends(SequienceExecutor, _super);
    function SequienceExecutor() {
        var _this = _super.call(this) || this;
        _this.delayTimeout = 1000;
        _this._progress = NaN;
        _this._totalLength = NaN;
        _this._currentIndex = NaN;
        _this.inputs = [];
        return _this;
    }
    SequienceExecutor.prototype.finishedInput = function (input) {
        if (this.isDestroyed)
            return;
        var index = this.inputs.indexOf(input);
        this.inputs.splice(index, 1);
        if (this.inputs.length == 0) {
            this.makeFinished();
            return;
        }
        this.nextIndex();
        this.nextInput();
    };
    SequienceExecutor.prototype.skipInput = function (input) {
        if (this.isDestroyed)
            return;
        this.nextIndex();
        this.nextInput();
    };
    SequienceExecutor.prototype.checkProgress = function () {
        var value = (100 * this.currentIndex) / this.totalLength;
        if (value == this._progress || isNaN(value) || !isFinite(value))
            return;
        this._progress = value;
    };
    SequienceExecutor.prototype.makeStarted = function () {
        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED));
        this.currentIndex = 0;
        this.nextInput();
    };
    SequienceExecutor.prototype.makeFinished = function () {
        this.totalLength = 0;
        this.currentIndex = 0;
        this.status = LoadableStatus.LOADED;
        ArrayUtil.clear(this.inputs);
        this.observer.next(new ObservableData(LoadableEvent.FINISHED));
    };
    SequienceExecutor.prototype.delay = function (timeout) {
        if (timeout === void 0) { timeout = NaN; }
        var delay = isNaN(timeout) ? this.delayTimeout : timeout;
        return new Promise(function (resolve) { return setTimeout(resolve, delay); });
    };
    SequienceExecutor.prototype.nextIndex = function () {
        var index = this.currentIndex + 1;
        if (index > this.inputs.length - 1)
            index = 0;
        this.currentIndex = index;
    };
    SequienceExecutor.prototype.nextInput = function () {
        var _this = this;
        var input = this.inputs[this.currentIndex];
        this.executeInput(input).then(function (data) {
            _this.observer.next(new ObservableData(LoadableEvent.COMPLETE, { input: input, output: data }));
            _this.finishedInput(input);
        }, function (error) {
            if (error === SequienceExecutorError.SKIP) {
                _this.skipInput(input);
            }
            else {
                _this.observer.next(new ObservableData(LoadableEvent.ERROR, { input: input, error: error }));
                _this.finishedInput(input);
            }
        });
    };
    SequienceExecutor.prototype.addInput = function (input) {
        if (this.inputs.includes(input))
            return;
        this.inputs.push(input);
        if (this.inputs.length > 0 && !this.isLoading)
            this.makeStarted();
    };
    Object.defineProperty(SequienceExecutor.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex;
        },
        set: function (value) {
            if (value == this._currentIndex)
                return;
            this._currentIndex = value;
            this.checkProgress();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SequienceExecutor.prototype, "totalLength", {
        get: function () {
            return this._totalLength;
        },
        set: function (value) {
            if (value == this._totalLength)
                return;
            this._totalLength = value;
            this.checkProgress();
        },
        enumerable: true,
        configurable: true
    });
    SequienceExecutor.prototype.start = function (inputs) {
        if (this.isLoading)
            return;
        this.currentIndex = 0;
        this.totalLength = inputs.length;
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            this.addInput(input);
        }
    };
    SequienceExecutor.prototype.stop = function () {
        if (this.isLoading)
            this.makeFinished();
    };
    SequienceExecutor.prototype.destroy = function () {
        this.inputs = null;
        this.observer = null;
        this.isDestroyed = true;
        this._totalLength = NaN;
        this._currentIndex = NaN;
    };
    Object.defineProperty(SequienceExecutor.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    return SequienceExecutor;
}(Loadable));
export { SequienceExecutor };
export var SequienceExecutorError;
(function (SequienceExecutorError) {
    SequienceExecutorError["SKIP"] = "SKIP";
})(SequienceExecutorError || (SequienceExecutorError = {}));
//# sourceMappingURL=../../../src/common/executor/SequienceExecutor.js.map