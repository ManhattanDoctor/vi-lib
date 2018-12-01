import { OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
export declare class ScrollDirective implements IDestroyable, OnDestroy {
    protected static INITIALIZATION_DELAY: number;
    scrolled: EventEmitter<number>;
    scrolledDelay: number;
    private timer;
    protected element: HTMLElement;
    protected isInitialized: boolean;
    protected _scrollValue: number;
    constructor(element: ElementRef);
    protected initialize(): void;
    protected scrollTo(value: number): void;
    private scrollHandler;
    private scrollChanged;
    protected scrollChangedHandler(): void;
    protected initializeHandler: () => void;
    protected readonly scrollTop: number;
    ngOnDestroy(): void;
    destroy(): void;
    scrollValue: number;
}
