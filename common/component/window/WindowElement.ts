import { AfterViewInit, ElementRef } from '@angular/core';
import { IWindow } from '../../../window/lib/IWindow';
import { ViewUtil } from '../../util/ViewUtil';
import { DestroyableComponent } from '../DestroyableComponent';

export class WindowElement extends DestroyableComponent implements AfterViewInit {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected _window: IWindow;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected element: ElementRef) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected checkWindowParent(): void {
        let container: HTMLElement = this.element.nativeElement;
        while (container && container.nodeName.toLowerCase() !== 'mat-dialog-container') container = container.parentElement;

        if (container) ViewUtil.appendChild(container, this.element.nativeElement);
    }

    protected createChildren(): void {}

    protected destroyChildren(): void {}

    protected commitWindowProperties(): void {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngAfterViewInit(): void {
        this.createChildren();
        this.checkWindowParent();
    }

    public destroy(): void {
        super.destroy();
        this.destroyChildren();

        this.element = null;
        this.window = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get nativeElement(): HTMLElement {
        return this.element ? this.element.nativeElement : null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get window(): IWindow {
        return this._window;
    }
    public set window(value: IWindow) {
        if (value === this._window) return;

        this._window = value;
        if (this.window) {
            this.commitWindowProperties();
        }
    }
}
