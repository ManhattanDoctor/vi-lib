import { Directive, ElementRef } from '@angular/core';
import { ViewUtil } from '../../common/util/ViewUtil';
import { ThemeService } from '../service/ThemeService';
import { ThemeAssetDirective } from './ThemeAssetDirective';

@Directive({
    selector: '[theme-background]'
})
export class ThemeAssetBackgroundDirective extends ThemeAssetDirective {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef, theme: ThemeService) {
        super(element, theme);
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected commitSourceProperties(): void {
        let value = 'url(' + this.source + ')';
        ViewUtil.setStyle(this.element, 'backgroundImage', value);
    }
}
