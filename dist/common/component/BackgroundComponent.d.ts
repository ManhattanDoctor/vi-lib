import { ElementRef } from '@angular/core';
import { DestroyableComponent } from './DestroyableComponent';
export declare class BackgroundComponent extends DestroyableComponent {
    protected element: ElementRef;
    private directive;
    constructor(element: ElementRef);
    destroy(): void;
    background: string;
}
