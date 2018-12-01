import { ElementRef, OnDestroy } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
export declare class AssetBackgroundDirective implements IDestroyable, OnDestroy {
    private element;
    isUrl: boolean;
    isIcon: boolean;
    isImage: boolean;
    repeat: string;
    extension: string;
    private _background;
    constructor(element: ElementRef);
    private getUrl;
    destroy(): void;
    ngOnDestroy(): void;
    background: string;
}
