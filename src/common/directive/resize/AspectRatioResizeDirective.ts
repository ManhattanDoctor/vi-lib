import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
import { ViewUtil } from '../../util/ViewUtil';
import { ResizeController } from './ResizeController';

@Directive({
    selector: '[vi-aspect-ratio]'
})
export class AspectRatioResizeDirective implements IDestroyable, AfterViewInit {
    // --------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    // --------------------------------------------------------------------------

    protected static UPDATE_DELAY: number = 100;

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _ratio: number = NaN;
    private _direction: Direction;

    private sensor: ResizeController;
    private element: HTMLElement;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitResizeProperties = () => {
        if (this._direction === 'horizontal') this.width = this.height / this.ratio;
        else if (this._direction === 'vertical') this.height = this.width * this.ratio;
    };

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngAfterViewInit(): void {
        this.sensor = new ResizeController(this.element, this.commitResizeProperties, AspectRatioResizeDirective.UPDATE_DELAY);

        if (isNaN(this.ratio)) this.ratio = ViewUtil.VIDEO_RATIO;
    }

    public ngOnDestroy(): void {
        this.destroy();
    }

    public destroy(): void {
        this.element = null;

        if (this.sensor) {
            this.sensor.destroy();
            this.sensor = null;
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    // --------------------------------------------------------------------------

    private get width(): number {
        return ViewUtil.getWidth(this.element);
    }

    private set width(value: number) {
        ViewUtil.setWidth(this.element, value, true);
    }

    private get height(): number {
        return ViewUtil.getHeight(this.element);
    }

    private set height(value: number) {
        ViewUtil.setHeight(this.element, value, true);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    @Input('vi-aspect-ratio')
    public set direction(value: Direction) {
        if (value === this._direction || !value) return;

        this._direction = value;
        this.commitResizeProperties();
    }
    public get direction(): Direction {
        return this._direction;
    }

    @Input()
    public set ratio(value: number) {
        if (value === this._ratio) return;

        this._ratio = value;
        this.commitResizeProperties();
    }

    public get ratio(): number {
        return this._ratio;
    }
}

export declare type Direction = 'vertical' | 'horizontal';
