import { ElementRef } from '@angular/core';
import { WindowElement } from './WindowElement';
export declare class CloseWindowElementComponent extends WindowElement {
    static ICON_CLASS: Array<string>;
    static ICON_VALUE: string;
    constructor(element: ElementRef);
    protected createChildren(): void;
    protected destroyChildren(): void;
    private mouseClickHandler;
}
