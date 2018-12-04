import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { LanguageService } from '../../language/service/LanguageService';

@Pipe({
    name: 'formatNgModelError'
})
export class NgModelErrorPipe implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(value: ValidationErrors): string {
        if (!value) return null;

        let keys = Object.keys(value);
        if (keys.length === 0) return null;

        let key = keys[0];
        return this.translateError(key, value[key]);
    }

    public translateError(key: string, value: any): string {
        return this.language.translate('error.form.' + key, value);
    }

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private language: LanguageService) {}
}
