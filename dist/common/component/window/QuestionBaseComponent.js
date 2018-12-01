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
import { Subject } from 'rxjs';
import { IWindowContent } from '../../../window/lib/IWindowContent';
import { IQuestion } from '../../IQuestion';
var QuestionBaseComponent = (function (_super) {
    __extends(QuestionBaseComponent, _super);
    function QuestionBaseComponent(container, language) {
        var _this = _super.call(this, container) || this;
        _this.language = language;
        _this._mode = 'question';
        _this._isChecked = false;
        _this.observer = new Subject();
        _this.promise = new Promise(function (resolve, reject) {
            _this.promiseReject = reject;
            _this.promiseResolve = resolve;
        });
        return _this;
    }
    QuestionBaseComponent.prototype.commitModeProperties = function () { };
    QuestionBaseComponent.prototype.yesClickHandler = function () {
        this.promiseResolve();
        this.emit(IQuestion.EVENT_YES);
        this.close();
    };
    QuestionBaseComponent.prototype.notClickHandler = function () {
        this.promiseReject();
        this.emit(IQuestion.EVENT_NOT);
        this.close();
    };
    QuestionBaseComponent.prototype.ngOnInit = function () {
        if (this.mode == 'question') {
            if (!this.yesText)
                this.yesTextId = this.defaultYesId;
            if (!this.notText)
                this.notTextId = this.defaultNoId;
        }
        else if (this.mode == 'info') {
            if (!this.closeText)
                this.closeTextId = this.defaultCloseId;
        }
    };
    QuestionBaseComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.observer = null;
    };
    Object.defineProperty(QuestionBaseComponent.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "yesNotPromise", {
        get: function () {
            return this.promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "defaultYesId", {
        get: function () {
            return 'general.yes';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "defaultNoId", {
        get: function () {
            return 'general.no';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "defaultCloseId", {
        get: function () {
            return 'general.close';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "isChecked", {
        get: function () {
            return this._isChecked;
        },
        set: function (value) {
            if (value == this._isChecked)
                return;
            this._isChecked = value;
            this.emit(value ? IQuestion.EVENT_CHECK : IQuestion.EVENT_UNCHECK);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            if (value == this._mode)
                return;
            this._mode = value;
            this.commitModeProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "closeTextId", {
        set: function (value) {
            if (value)
                this.closeText = this.language.translate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "yesTextId", {
        set: function (value) {
            if (value)
                this.yesText = this.language.translate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "notTextId", {
        set: function (value) {
            if (value)
                this.notText = this.language.translate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionBaseComponent.prototype, "checkTextId", {
        set: function (value) {
            if (value)
                this.checkText = this.language.translate(value);
        },
        enumerable: true,
        configurable: true
    });
    return QuestionBaseComponent;
}(IWindowContent));
export { QuestionBaseComponent };
//# sourceMappingURL=../../../../src/common/component/window/QuestionBaseComponent.js.map