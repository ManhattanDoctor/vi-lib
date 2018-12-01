import { AfterContentInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, NgModel, Validator, ValidatorFn } from '@angular/forms';
import { ValidationResult } from './validate';
import { ValueAccessor } from './ValueAccessor';
export declare abstract class FormElementSync<T> extends ValueAccessor<T> implements AfterContentInit, OnDestroy {
    private validators;
    protected abstract model: NgModel;
    protected _validationError: string;
    protected timer: any;
    constructor(validators: Array<Validator | ValidatorFn>);
    protected valueChanged(): void;
    protected validate: () => ValidationResult;
    readonly valid: boolean;
    readonly invalid: boolean;
    readonly validationError: string;
    protected isErrorState: (control: FormControl, form: NgForm | FormGroupDirective) => boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
