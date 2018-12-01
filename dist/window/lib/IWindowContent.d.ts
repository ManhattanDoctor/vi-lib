import { AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import { DestroyableComponent } from '../../common/component/DestroyableComponent';
import { IWindow } from './IWindow';
import { WindowConfig } from './WindowConfig';
export declare abstract class IWindowContent extends DestroyableComponent implements AfterViewInit {
    container: ViewContainerRef;
    protected _window: IWindow;
    constructor(container: ViewContainerRef);
    protected commitWindowProperties(): void;
    ngAfterViewInit(): void;
    blink(): void;
    shake(): void;
    emit(event: string): void;
    close(): void;
    destroy(): void;
    readonly config: WindowConfig;
    readonly isOnTop: boolean;
    readonly isMinimized: boolean;
    readonly element: ElementRef;
    window: IWindow;
}
