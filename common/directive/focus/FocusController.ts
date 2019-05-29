import { ElementRef } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
import { ViewUtil } from '../../util/ViewUtil';

export class FocusController implements IDestroyable {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected timer: any;
    protected element: ElementRef;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.element = element;
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private focusElement = () => {
        if (this.element) ViewUtil.focusInput(this.element.nativeElement);
    };

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public focus(): void {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.focusElement, ViewUtil.FOCUS_DELAY);
    }

    public destroy(): void {
        this.element = null;

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
