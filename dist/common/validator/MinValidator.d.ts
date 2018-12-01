import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
export declare class MinValidator implements Validator {
    private _validator;
    constructor(min: number);
    validate(control: AbstractControl): ValidationErrors | null;
}
