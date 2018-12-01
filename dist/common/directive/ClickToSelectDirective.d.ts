import { ElementRef, OnDestroy } from '@angular/core';
export declare class ClickToSelectDirective implements OnDestroy {
    protected element: HTMLElement;
    constructor(element: ElementRef);
    private clickHandler;
    ngOnDestroy(): void;
}
