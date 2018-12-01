import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';
import { ViewUtil } from '../../util/ViewUtil';
import { Assets } from '../Assets';

@Directive({
    selector: '[vi-asset-background]'
})
export class AssetBackgroundDirective implements IDestroyable, OnDestroy {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public isUrl: boolean = false;
    @Input()
    public isIcon: boolean = false;
    @Input()
    public isImage: boolean = false;

    @Input('background-repeat')
    public repeat: string = 'repeat';

    @Input('background-extension')
    public extension: string = 'png';

    private _background: string;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private element: ElementRef) {}

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private getUrl(id: string, isImage?: boolean, isIcon?: boolean, isUrl?: boolean): string {
        if (!id) return null;

        if (isUrl) return id;
        if (isImage) return Assets.getImage(id, this.extension);
        if (isIcon) return Assets.getIcon(id, this.extension);

        return Assets.getBackground(id, this.extension);
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        this.element = null;
    }

    public ngOnDestroy(): void {
        this.destroy();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    @Input('vi-asset-background')
    public set background(value: string) {
        if (value == this._background) return;

        this._background = value;
        let url = this.getUrl(value, this.isImage, this.isIcon, this.isUrl);
        ViewUtil.setBackground(this.element.nativeElement, url, this.repeat);
    }

    public get background(): string {
        return this._background;
    }
}
