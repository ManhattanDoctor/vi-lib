import { ElementRef, OnDestroy } from '@angular/core';
export declare class FocusDirective implements OnDestroy {
    private element;
    private static DELAY;
    private timer;
    constructor(element: ElementRef);
    protected focus: () => void;
    ngOnDestroy(): void;
    trigger: any;
}
