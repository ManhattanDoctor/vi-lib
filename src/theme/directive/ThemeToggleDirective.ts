import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { ThemeService } from '../service/ThemeService';

@Directive({
    selector: '[theme-toggle]'
})
export class ThemeToggleDirective implements OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private element: HTMLElement;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private theme: ThemeService) {
        this.element = element.nativeElement;
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('click', ['$event'])
    private clickHandler(event: MouseEvent) {
        let index = 0;
        if (this.theme.theme) {
            index = this.theme.themes.collection.indexOf(this.theme.theme);
            if (index >= this.theme.themes.length - 1) index = 0;
            else index++;
        }

        if (index <= this.theme.themes.length - 1) this.theme.theme = this.theme.themes.collection[index];
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this.theme = null;
        this.element = null;
    }
}
