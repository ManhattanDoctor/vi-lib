import { AfterViewInit, ElementRef } from '@angular/core';
import { IWindow } from '../../../../window/lib/IWindow';
import { DestroyableComponent } from '../../DestroyableComponent';
export declare class WindowElement extends DestroyableComponent implements AfterViewInit {
    protected element: ElementRef;
    protected _window: IWindow;
    constructor(element: ElementRef);
    protected checkWindowParent(): void;
    protected createChildren(): void;
    protected destroyChildren(): void;
    protected commitWindowProperties(): void;
    ngAfterViewInit(): void;
    destroy(): void;
    protected readonly nativeElement: HTMLElement;
    window: IWindow;
}
