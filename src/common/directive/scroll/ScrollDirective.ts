import { Directive, OnDestroy, EventEmitter, Output, ElementRef, Input, HostListener } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';

@Directive({
    selector: '[vi-scroll]'
})
export class ScrollDirective implements IDestroyable, OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Static Properties
    //
    //--------------------------------------------------------------------------

    protected static INITIALIZATION_DELAY: number = 1;

    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    @Output()
    public scrolled: EventEmitter<number> = new EventEmitter();
    @Input()
    public scrolledDelay: number = 100;

    private timer: any;

    protected element: HTMLElement;
    protected isInitialized: boolean = false;
    protected _scrollValue: number = 0;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
        this.timer = setTimeout(this.initializeHandler, ScrollDirective.INITIALIZATION_DELAY);
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        if (this.scrollValue) this.scrollTo(this.scrollValue);
        this.isInitialized = true;
    }

    protected scrollTo(value: number): void {
        this._scrollValue = value;
        this.element.scrollTop = value;
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    @HostListener('scroll')
    private scrollHandler() {
        if (!this.isInitialized) return;

        clearTimeout(this.timer);
        this.timer = setTimeout(this.scrollChanged, this.scrolledDelay);
    }

    private scrollChanged = () => {
        this.scrollChangedHandler();
    };

    protected scrollChangedHandler(): void {
        this._scrollValue = this.scrollTop;
        this.scrolled.next(this._scrollValue);
    }

    protected initializeHandler = () => {
        this.initialize();
    };

    //--------------------------------------------------------------------------
    //
    //	Private Properties
    //
    //--------------------------------------------------------------------------

    protected get scrollTop(): number {
        return this.element.scrollTop;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this.destroy();
    }

    public destroy(): void {
        this.element = null;
        this.isInitialized = false;

        this._scrollValue = 0;

        clearTimeout(this.timer);
        this.timer = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public set scrollValue(value: number) {
        if (value == this._scrollValue || isNaN(value)) return;

        this._scrollValue = value;
        if (this.isInitialized) this.scrollTo(value);
    }

    public get scrollValue(): number {
        return this._scrollValue;
    }
}
