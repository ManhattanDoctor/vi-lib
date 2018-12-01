import { ElementRef } from '@angular/core';
import { WindowElement } from './WindowElement';
export declare class MinimizeWindowElementComponent extends WindowElement {
    static ICON_CLASS: Array<string>;
    static ICON_MINIMIZE_VALUE: string;
    static ICON_MAXIMIZE_VALUE: string;
    constructor(element: ElementRef);
    private commitIconProperties;
    protected commitWindowProperties(): void;
    protected createChildren(): void;
    protected destroyChildren(): void;
    private mouseClickHandler;
}
