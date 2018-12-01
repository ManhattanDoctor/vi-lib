import { AbstractControl, AsyncValidatorFn, Validator, ValidatorFn } from '@angular/forms';
export declare type ValidationResult = {
    [validator: string]: string | boolean;
};
export declare type ValidatorArray = Array<Validator | ValidatorFn>;
export declare type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;
export declare const composeValidators: (validators: (Validator | ValidatorFn)[]) => ValidatorFn | AsyncValidatorFn;
export declare const validate: (validators: (Validator | ValidatorFn)[], asyncValidators: (Validator | AsyncValidatorFn)[]) => (control: AbstractControl) => any;
export declare const message: (validator: ValidationResult, key: string) => string;
