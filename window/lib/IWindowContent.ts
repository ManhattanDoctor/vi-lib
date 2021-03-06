import { AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import { DestroyableComponent } from '../../common/component/DestroyableComponent';
import { IWindow } from './IWindow';
import { WindowConfig } from './WindowConfig';

export abstract class IWindowContent extends DestroyableComponent implements AfterViewInit {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _window: IWindow;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(public container: ViewContainerRef) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected commitWindowProperties(): void {}

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public ngAfterViewInit(): void {
        this.emit(IWindow.EVENT_CONTENT_READY);
    }

    public blink(): void {
        if (this.window) this.window.blink();
    }

    public shake(): void {
        if (this.window) this.window.shake();
    }

    public emit(event: string): void {
        if (this.window) this.window.emit(event);
    }

    public close(): void {
        if (this.window) this.window.close();
    }

    public destroy(): void {
        super.destroy();
        this.container = null;
        this.window = null;
    }

    // --------------------------------------------------------------------------
    //
    //  Proxy Public Properties
    //
    // --------------------------------------------------------------------------

    public get config(): WindowConfig {
        return this.window ? this.window.config : null;
    }

    public get isOnTop(): boolean {
        return this.window ? this.window.isOnTop : false;
    }

    public get isMinimized(): boolean {
        return this.window ? this.window.isMinimized : false;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public get element(): ElementRef {
        return this.container ? this.container.element : null;
    }

    public get window(): IWindow {
        return this._window;
    }

    public set window(value: IWindow) {
        if (value === this._window) return;
        this._window = value;
        if (this._window) this.commitWindowProperties();
    }
}
