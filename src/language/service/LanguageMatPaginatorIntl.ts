import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { LoadableEvent } from '../../common/lib/Loadable';
import { LanguageService } from './LanguageService';

@Injectable()
export class LanguageMatPaginatorIntl extends MatPaginatorIntl {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    public lastPageLabel: string;
    public nextPageLabel: string;
    public firstPageLabel: string;
    public previousPageLabel: string;
    public itemsPerPageLabel: string;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private language: LanguageService) {
        super();

        this.commitLanguageProperties();
        this.language.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) this.commitLanguageProperties();
        });
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitLanguageProperties(): void {
        this.lastPageLabel = this.language.translate('paginator.lastPage');
        this.nextPageLabel = this.language.translate('paginator.nextPage');
        this.firstPageLabel = this.language.translate('paginator.firstPage');
        this.previousPageLabel = this.language.translate('paginator.previousPage');
        this.itemsPerPageLabel = this.language.translate('paginator.itemsPerPage');
    }
}
