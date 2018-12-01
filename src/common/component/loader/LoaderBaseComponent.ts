import { ElementRef, Input } from '@angular/core';
import { ViewUtil } from '../../util/ViewUtil';
import { DestroyableComponent } from '../DestroyableComponent';

export class LoaderBaseComponent extends DestroyableComponent {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public emptyText: string;
    @Input()
    public loadingText: string;

    private _isBlock: boolean = false;
    private _isEmpty: boolean = false;
    private _isLoading: boolean = false;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(protected element: ElementRef) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get isLoading(): boolean {
        return this._isLoading;
    }
    @Input()
    public set isLoading(value: boolean) {
        if (value == this._isLoading) return;

        this._isLoading = value;
        ViewUtil.toggleClass(this.element, 'loading', this.isLoading);
    }

    public get isEmpty(): boolean {
        return this._isEmpty;
    }
    @Input()
    public set isEmpty(value: boolean) {
        if (value == this._isEmpty) return;

        this._isEmpty = value;
        ViewUtil.toggleClass(this.element, 'empty', this.isEmpty);
    }

    public get isBlock(): boolean {
        return this._isBlock;
    }
    @Input()
    public set isBlock(value: boolean) {
        if (value == this._isBlock) return;

        this._isBlock = value;
        ViewUtil.toggleClass(this.element, 'block', this.isBlock);
    }
}
