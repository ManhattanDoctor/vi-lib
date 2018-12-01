import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '../../../util/ViewUtil';
import { WindowElement } from './WindowElement';

@Component({
    selector: 'resize-window-element',
    styleUrls: ['icon-window-element.component.scss'],
    template: ''
})
export class ResizeWindowElementComponent extends WindowElement {
    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    public static ICON_CLASS: Array<string> = ['material-icons'];
    public static ICON_VALUE: string = 'adjust';

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef) {
        super(element);
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected createChildren(): void {
        super.createChildren();

        if (ResizeWindowElementComponent.ICON_VALUE) ViewUtil.setProperty(this.nativeElement, 'innerHTML', ResizeWindowElementComponent.ICON_VALUE);
        if (ResizeWindowElementComponent.ICON_CLASS)
            ResizeWindowElementComponent.ICON_CLASS.forEach(value => {
                ViewUtil.addClass(this.nativeElement, value);
            });

        ViewUtil.setStyle(this.nativeElement, 'cursor', 'pointer');
        this.nativeElement.addEventListener('click', this.mouseClickHandler, true);
    }

    protected destroyChildren(): void {
        this.nativeElement.removeEventListener('click', this.mouseClickHandler, true);
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    private mouseClickHandler = (event: MouseEvent) => {
        event.stopPropagation();

        if (this.window) this.window.isMinimized = !this.window.isMinimized;
    };
}