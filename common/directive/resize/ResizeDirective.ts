import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IDestroyable } from '../../IDestroyable';

@Directive({
    selector: '[vi-resize]'
})
export class ResizeDirective implements IDestroyable, OnDestroy {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @Output()
    public resize: EventEmitter<any> = new EventEmitter();

    @Input()
    public isTop: boolean = false;
    @Input()
    public isLeft: boolean = false;
    @Input()
    public isRight: boolean = false;
    @Input()
    public isBottom: boolean = false;

    private interactable: any;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef) {
        this.interactable = interact(element.nativeElement);
        this.interactable.styleCursor(false);

        let param = {} as any;
        param.top = this.isTop;
        param.left = this.isLeft;
        param.right = this.isRight;
        param.bottom = this.isBottom;
        this.interactable.resizable(param);
        this.interactable.on('resizemove', this.resizeHandler);
    }

    // --------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    // --------------------------------------------------------------------------

    private resizeHandler = (event: any) => {
        if (event.dx !== 0 || event.dy !== 0) this.resize.emit(event);
    };

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this.destroy();
    }

    public destroy(): void {
        this.interactable.unset();
        this.interactable = null;
    }
}

declare let interact: any;
