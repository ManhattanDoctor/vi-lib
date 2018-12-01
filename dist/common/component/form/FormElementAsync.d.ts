import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncValidatorArray, ValidationResult, ValidatorArray } from './validate';
import { ValueAccessor } from './ValueAccessor';
export declare abstract class FormElementAsync<T> extends ValueAccessor<T> {
    private validators;
    private asyncValidators;
    protected abstract model: NgModel;
    constructor(validators: ValidatorArray, asyncValidators: AsyncValidatorArray);
    protected validate(): Observable<ValidationResult>;
    protected readonly invalid: Observable<boolean>;
    protected readonly failures: Observable<Array<string>>;
}
