import { MatDialogRef } from '@angular/material';
import { DestroyableComponent } from '../../common/component/DestroyableComponent';
import { WindowConfig } from './WindowConfig';
export declare abstract class WindowBase extends DestroyableComponent {
    protected _x: number;
    protected _width: number;
    protected _y: number;
    protected _height: number;
    constructor();
    protected abstract getConfig(): WindowConfig;
    protected abstract getReference(): MatDialogRef<any>;
    protected abstract getContainer(): HTMLElement;
    protected setProperties(): void;
    protected setPosition(): void;
    protected clearSize(): void;
    protected commitSizeProperties(): void;
    protected commitPositionProperties(): void;
    protected checkSizeAndUpdatePositionIfNeed: () => void;
    x: number;
    y: number;
    readonly paddingTop: number;
    readonly paddingLeft: number;
    readonly paddingRight: number;
    readonly paddingBottom: number;
    protected width: number;
    protected height: number;
}
