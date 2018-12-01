import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ViewUtil } from '../../util/ViewUtil';

@Directive({
    selector: '[vi-focus]'
})
export class FocusDirective implements OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Static Properties
    //
    //--------------------------------------------------------------------------

    private static DELAY: number = 100;

    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private timer: any;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private element: ElementRef) {}

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected focus = () => {
        ViewUtil.focusInput(this.element.nativeElement);
    };

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public ngOnDestroy(): void {
        clearTimeout(this.timer);
        this.timer = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    @Input('vi-focus')
    public set trigger(value: any) {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.focus, FocusDirective.DELAY);
    }
}
