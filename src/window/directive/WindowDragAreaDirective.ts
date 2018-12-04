import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { IDestroyable } from '../../common/IDestroyable';
import { IWindow } from '../lib/IWindow';
import { DragableWindow } from '../lib/window/DragableWindow';

@Directive({
    selector: '[vi-window-drag-area]'
})
export class WindowDragAreaDirective implements IDestroyable, OnDestroy {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _window: DragableWindow;
    private _interactable: any;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private element: ElementRef) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this._interactable) {
            interact(this.element.nativeElement).unset();
            this._interactable = null;
        }
        this.element = null;
    }

    public ngOnDestroy(): void {
        this.destroy();
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitWindowProperties(): void {
        if (!this.window.config || this.window.config.isModal) return;

        this.interactable.draggable(true);
        this.interactable.on('dragmove', this.dragMoveHandler);
        this.interactable.on('dragstart', this.dragStartHandler);
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    private dragStartHandler = (event: any): void => {
        this._window.dragStartHandler(event);
    };

    private dragMoveHandler = (event: any): void => {
        this._window.dragMoveHandler(event);
    };

    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------

    protected get interactable(): any {
        if (!this._interactable) {
            this._interactable = interact(this.element.nativeElement);
            this._interactable.styleCursor(false);
        }
        return this._interactable;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    @Input('vi-window-drag-area')
    public set window(value: IWindow) {
        if (value === this._window) return;

        this._window = value as DragableWindow;
        if (this._window) this.commitWindowProperties();
    }

    public get window(): IWindow {
        return this._window;
    }
}

declare let interact: any;
