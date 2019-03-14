import { AfterViewInit, ElementRef } from '@angular/core';
import { DestroyableComponent } from './DestroyableComponent';

export abstract class ApplicationComponent extends DestroyableComponent implements AfterViewInit {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------
    
    private isViewReady: boolean;
    private viewTimeout: any;
    private viewReadyResolver: any;
    private _viewReady: Promise<void>;

    private isReadyCalled: boolean;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected element: ElementRef, private viewReadyDelay: number = NaN) {
        super();
        this._viewReady = new Promise(resolve => (this.viewReadyResolver = resolve));
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private makeViewReady = (): void => {
        this.isViewReady = true;
        this.viewReadyResolver();
        this.checkReady();
    };

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected checkReady(): void {
        if (this.isReady() && !this.isReadyCalled) {
            this.isReadyCalled = true;
            this.readyHandler();
        }
    }

    protected isReady(): boolean {
        return this.isViewReady;
    }

    protected abstract readyHandler(): void;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public ngAfterViewInit(): void {
        if (!isNaN(this.viewReadyDelay)) {
            this.viewTimeout = setTimeout(this.makeViewReady, this.viewReadyDelay);
        } else {
            this.makeViewReady();
        }
    }

    public destroy(): void {
        super.destroy();
        this.element = null;

        clearTimeout(this.viewTimeout);
        this.viewTimeout = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get viewReady(): Promise<void> {
        return this._viewReady;
    }
}
