import { ElementRef, OnDestroy } from '@angular/core';
import { ThemeService } from '../service/ThemeService';
export declare class ThemeToggleDirective implements OnDestroy {
    private theme;
    private element;
    constructor(element: ElementRef, theme: ThemeService);
    private clickHandler;
    ngOnDestroy(): void;
}
