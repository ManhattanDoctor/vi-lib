import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { ViewUtil } from '../util/ViewUtil';

@Directive({
    selector: '[vi-click-to-select]'
})
export class ClickToSelectDirective implements OnDestroy {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected element: HTMLElement;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    @HostListener('click', ['$event'])
    private clickHandler(event: MouseEvent) {
        if (event.detail >= 3) ViewUtil.selectContent(this.element, true);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this.element = null;
    }
}
