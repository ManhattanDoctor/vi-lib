import { ElementRef } from '@angular/core';
import { DestroyableComponent } from '../DestroyableComponent';
export declare class LoaderBaseComponent extends DestroyableComponent {
    protected element: ElementRef;
    emptyText: string;
    loadingText: string;
    private _isBlock;
    private _isEmpty;
    private _isLoading;
    constructor(element: ElementRef);
    isLoading: boolean;
    isEmpty: boolean;
    isBlock: boolean;
}
