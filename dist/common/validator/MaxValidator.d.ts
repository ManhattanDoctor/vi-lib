import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
export declare class MaxValidator implements Validator {
    private _validator;
    constructor(max: number);
    validate(control: AbstractControl): ValidationErrors | null;
}
