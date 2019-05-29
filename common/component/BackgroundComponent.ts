import { ElementRef } from '@angular/core';
import { AssetBackgroundDirective } from '../asset/directive/AssetBackgroundDirective';
import { DestroyableComponent } from './DestroyableComponent';
export class BackgroundComponent extends DestroyableComponent {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private directive: AssetBackgroundDirective;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected element: ElementRef) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this.element = null;

        if (this.directive) {
            this.directive.destroy();
            this.directive = null;
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get background(): string {
        return this.directive ? this.directive.background : null;
    }

    public set background(value: string) {
        if (value && !this.directive) this.directive = new AssetBackgroundDirective(this.element);

        if (this.directive) this.directive.background = value;
    }
}
