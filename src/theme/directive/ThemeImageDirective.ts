import { Directive, ElementRef } from '@angular/core';
import { ThemeService } from '../service/ThemeService';
import { ThemeAssetDirective } from './ThemeAssetDirective';

@Directive({
    selector: '[theme-image]'
})
export class ThemeImageDirective extends ThemeAssetDirective {
    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, theme: ThemeService) {
        super(element, theme);
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitSourceProperties(): void {
        (this.element as HTMLImageElement).src = this.source;
    }
}
