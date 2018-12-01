import { ElementRef } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
export declare class FocusController implements IDestroyable {
    protected timer: any;
    protected element: ElementRef;
    constructor(element: ElementRef);
    private focusElement;
    focus(): void;
    destroy(): void;
}
