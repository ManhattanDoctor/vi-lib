import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Attribute, Directive } from '@angular/core';

@Directive({
    selector: '[max][ngControl],[max][ngFormControl],[max][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxValidator, multi: true }]
})
export class MaxValidator implements Validator {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    private _validator: ValidatorFn;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(@Attribute('max') max: number) {
        this._validator = Validators.max(max);
    }

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public validate(control: AbstractControl): ValidationErrors | null {
        return this._validator(control);
    }
}
