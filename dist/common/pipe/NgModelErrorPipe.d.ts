import { PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { LanguageService } from '../../language/service/LanguageService';
export declare class NgModelErrorPipe implements PipeTransform {
    private language;
    transform(value: ValidationErrors): string;
    translateError(key: string, value: any): string;
    constructor(language: LanguageService);
}
