import { AbstractControl, AsyncValidatorFn, Validator, Validators, ValidatorFn } from '@angular/forms';

import { Observable, of } from 'rxjs';

// --------------------------------------------------------------------------
//
//  Export Properties
//
// --------------------------------------------------------------------------

export interface ValidationResult {
    [validator: string]: string | boolean;
}
export type ValidatorArray = Array<Validator | ValidatorFn>;
export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;

const normalizeValidator = (validator: Validator | ValidatorFn): ValidatorFn | AsyncValidatorFn => {
    const func = (validator as Validator).validate.bind(validator);
    if (typeof func === 'function') return (control: AbstractControl) => func(control);
    else return validator as ValidatorFn | AsyncValidatorFn;
};

export const composeValidators = (validators: ValidatorArray): AsyncValidatorFn | ValidatorFn => {
    if (validators === null || validators.length === 0) return null;

    return Validators.compose(validators.map(normalizeValidator));
};

export const validate = (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
    return (control: AbstractControl) => {
        const synchronousValid = () => composeValidators(validators)(control);
        if (asyncValidators) {
            const asyncValidator = composeValidators(asyncValidators);

            return asyncValidator(control).map(v => {
                const secondary = synchronousValid();
                if (secondary || v) return Object.assign({}, secondary, v);
            });
        }

        if (validators) return of(synchronousValid());

        return of(null);
    };
};

export const message = (validator: ValidationResult, key: string): string => {
    if (!key) return 'Validation failed: ' + validator.toString();

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

    let value = validator[key];
    switch (typeof value) {
        case 'string':
            return value as string;
        default:
            return 'Validation failed: ' + key;
    }
};
