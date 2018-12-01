import { Validators } from '@angular/forms';
import { of } from 'rxjs';
var normalizeValidator = function (validator) {
    var func = validator.validate.bind(validator);
    if (typeof func === 'function')
        return function (control) { return func(control); };
    else
        return validator;
};
export var composeValidators = function (validators) {
    if (validators == null || validators.length === 0)
        return null;
    return Validators.compose(validators.map(normalizeValidator));
};
export var validate = function (validators, asyncValidators) {
    return function (control) {
        var synchronousValid = function () { return composeValidators(validators)(control); };
        if (asyncValidators) {
            var asyncValidator = composeValidators(asyncValidators);
            return asyncValidator(control).map(function (v) {
                var secondary = synchronousValid();
                if (secondary || v)
                    return Object.assign({}, secondary, v);
            });
        }
        if (validators)
            return of(synchronousValid());
        return of(null);
    };
};
export var message = function (validator, key) {
    if (!key)
        return 'Validation failed: ' + validator.toString();
    switch (key) {
        case 'required':
            return 'Please enter a value';
        case 'pattern':
            return 'Value does not match required pattern';
        case 'minlength':
            return 'Value must be N characters';
        case 'maxlength':
            return 'Value must be a maximum of N characters';
    }
    var value = validator[key];
    switch (typeof value) {
        case 'string':
            return value;
        default:
            return 'Validation failed: ' + key;
    }
};
//# sourceMappingURL=../../../../src/common/component/form/validate.js.map