import { Component, ElementRef } from '@angular/core';
import { filter } from 'rxjs/internal/operators';
import { IWindow } from '../../../../window/lib/IWindow';
import { ViewUtil } from '../../../util/ViewUtil';
import { WindowElement } from './WindowElement';

@Component({
    selector: 'minimize-window-element',
    styleUrls: ['icon-window-element.component.scss'],
    template: ''
})
export class MinimizeWindowElementComponent extends WindowElement {
    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    public static ICON_CLASS: Array<string> = ['material-icons'];
    public static ICON_MINIMIZE_VALUE: string = 'arrow_drop_up';
    public static ICON_MAXIMIZE_VALUE: string = 'arrow_drop_down';

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

    private commitIconProperties = (): void => {
        let icon = this.window.isMinimized ? MinimizeWindowElementComponent.ICON_MAXIMIZE_VALUE : MinimizeWindowElementComponent.ICON_MINIMIZE_VALUE;
        ViewUtil.setProperty(this.nativeElement, 'innerHTML', icon);
    };

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitWindowProperties(): void {
        super.commitWindowProperties();
        this.addSubscription(this.window.events.pipe(filter(event => event == IWindow.EVENT_MINIMIZED_CHANGED)).subscribe(this.commitIconProperties));
    }

    protected createChildren(): void {
        super.createChildren();

        if (MinimizeWindowElementComponent.ICON_MINIMIZE_VALUE)
            ViewUtil.setProperty(this.nativeElement, 'innerHTML', MinimizeWindowElementComponent.ICON_MINIMIZE_VALUE);
        if (MinimizeWindowElementComponent.ICON_CLASS)
            MinimizeWindowElementComponent.ICON_CLASS.forEach(value => {
                ViewUtil.addClass(this.nativeElement, value);
            });

        ViewUtil.setStyle(this.nativeElement, 'cursor', 'pointer');
        this.nativeElement.addEventListener('click', this.mouseClickHandler, true);
    }

    protected destroyChildren(): void {
        super.destroyChildren();
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
