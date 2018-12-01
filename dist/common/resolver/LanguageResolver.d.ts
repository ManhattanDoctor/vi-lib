import { Resolve } from '@angular/router';
import { LanguageService } from '../../language/service/LanguageService';
export declare class LanguageResolver implements Resolve<void> {
    protected language: LanguageService;
    constructor(language: LanguageService);
    resolve(): Promise<void>;
}
