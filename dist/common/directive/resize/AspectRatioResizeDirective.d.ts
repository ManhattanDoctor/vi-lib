import { AfterViewInit, ElementRef } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
export declare class AspectRatioResizeDirective implements IDestroyable, AfterViewInit {
    protected static UPDATE_DELAY: number;
    private _ratio;
    private _direction;
    private sensor;
    private element;
    constructor(element: ElementRef);
    private commitResizeProperties;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    destroy(): void;
    private width;
    private height;
    direction: Direction;
    ratio: number;
}
export declare type Direction = 'vertical' | 'horizontal';
