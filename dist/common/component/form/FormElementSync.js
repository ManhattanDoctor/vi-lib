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
import { message } from './validate';
import { ValueAccessor } from './ValueAccessor';
var FormElementSync = (function (_super) {
    __extends(FormElementSync, _super);
    function FormElementSync(validators) {
        var _this = _super.call(this) || this;
        _this.validators = validators;
        _this.validate = function () {
            if (!_this.validators || _this.validators.length == 0) {
                _this._validationError = null;
                return null;
            }
            var failure = null;
            for (var _i = 0, _a = _this.validators; _i < _a.length; _i++) {
                var item = _a[_i];
                failure = typeof item === 'function' ? item(_this.model.control) : item.validate(_this.model.control);
                if (failure)
                    break;
            }
            _this._validationError = failure ? message(failure, Object.keys(failure)[0]) : null;
            return failure;
        };
        _this.isErrorState = function (control, form) {
            return _this.invalid;
        };
        return _this;
    }
    FormElementSync.prototype.valueChanged = function () {
        _super.prototype.valueChanged.call(this);
        setTimeout(this.validate);
    };
    Object.defineProperty(FormElementSync.prototype, "valid", {
        get: function () {
            return !this.invalid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormElementSync.prototype, "invalid", {
        get: function () {
            return this._validationError != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormElementSync.prototype, "validationError", {
        get: function () {
            return this._validationError;
        },
        enumerable: true,
        configurable: true
    });
    FormElementSync.prototype.ngAfterContentInit = function () {
        this.validate();
    };
    FormElementSync.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
        this.timer = null;
    };
    return FormElementSync;
}(ValueAccessor));
export { FormElementSync };
//# sourceMappingURL=../../../../src/common/component/form/FormElementSync.js.map