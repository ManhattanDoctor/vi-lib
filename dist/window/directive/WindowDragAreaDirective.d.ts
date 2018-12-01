import { ElementRef, OnDestroy } from '@angular/core';
import { IDestroyable } from '../../common/IDestroyable';
import { IWindow } from '../lib/IWindow';
export declare class WindowDragAreaDirective implements IDestroyable, OnDestroy {
    private element;
    private _window;
    private _interactable;
    constructor(element: ElementRef);
    destroy(): void;
    ngOnDestroy(): void;
    private commitWindowProperties;
    private dragStartHandler;
    private dragMoveHandler;
    protected readonly interactable: any;
    window: IWindow;
}
