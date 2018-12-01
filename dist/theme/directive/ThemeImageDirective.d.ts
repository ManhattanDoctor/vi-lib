import { ElementRef } from '@angular/core';
import { ThemeService } from '../service/ThemeService';
import { ThemeAssetDirective } from './ThemeAssetDirective';
export declare class ThemeImageDirective extends ThemeAssetDirective {
    constructor(element: ElementRef, theme: ThemeService);
    protected commitSourceProperties(): void;
}
