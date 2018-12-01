import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
export declare class ResizeDirective implements IDestroyable, OnDestroy {
    resize: EventEmitter<any>;
    isTop: boolean;
    isLeft: boolean;
    isRight: boolean;
    isBottom: boolean;
    private interactable;
    constructor(element: ElementRef);
    private resizeHandler;
    ngOnDestroy(): void;
    destroy(): void;
}
