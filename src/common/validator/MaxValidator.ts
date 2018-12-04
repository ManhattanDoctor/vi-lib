/*
import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator,} from '@angular/forms';
import {ValidationErrors} from "@angular/forms/src/directives/validators";


export class MinValidator implements Validator
{
	
	public validate(control:AbstractControl):ValidationErrors
	{
		let value = control.value;
		if(!value || value > )
			return null;
		
		value = parseFloat(value);
		console.log(value);
		
		if(isNaN(value))
			return {minValue:"Value must be number"};
		
		return {minValue:"Value less than"};
	}
}
*/

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
        console.log(max);
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
