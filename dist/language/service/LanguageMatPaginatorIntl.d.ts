import { MatPaginatorIntl } from '@angular/material';
import { LanguageService } from './LanguageService';
export declare class LanguageMatPaginatorIntl extends MatPaginatorIntl {
    private language;
    lastPageLabel: string;
    nextPageLabel: string;
    firstPageLabel: string;
    previousPageLabel: string;
    itemsPerPageLabel: string;
    constructor(language: LanguageService);
    protected commitLanguageProperties(): void;
}
