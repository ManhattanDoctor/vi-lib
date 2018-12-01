import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Attribute, Directive } from '@angular/core';

@Directive({
    selector: '[min][ngControl],[min][ngFormControl],[min][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinValidator, multi: true }]
})
export class MinValidator implements Validator {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    private _validator: ValidatorFn;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(@Attribute('min') min: number) {
        this._validator = Validators.min(min);
    }

    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    public validate(control: AbstractControl): ValidationErrors | null {
        return this._validator(control);
    }
}
