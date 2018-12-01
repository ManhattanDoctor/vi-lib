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
import { map } from 'rxjs/operators';
import { message, validate } from './validate';
import { ValueAccessor } from './ValueAccessor';
var FormElementAsync = (function (_super) {
    __extends(FormElementAsync, _super);
    function FormElementAsync(validators, asyncValidators) {
        var _this = _super.call(this) || this;
        _this.validators = validators;
        _this.asyncValidators = asyncValidators;
        return _this;
    }
    FormElementAsync.prototype.validate = function () {
        return validate(this.validators, this.asyncValidators)(this.model.control);
    };
    Object.defineProperty(FormElementAsync.prototype, "invalid", {
        get: function () {
            return this.validate().pipe(map(function (v) {
                return Object.keys(v || {}).length > 0;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormElementAsync.prototype, "failures", {
        get: function () {
            return this.validate().pipe(map(function (v) { return Object.keys(v).map(function (k) { return message(v, k); }); }));
        },
        enumerable: true,
        configurable: true
    });
    return FormElementAsync;
}(ValueAccessor));
export { FormElementAsync };
//# sourceMappingURL=../../../../src/common/component/form/FormElementAsync.js.map