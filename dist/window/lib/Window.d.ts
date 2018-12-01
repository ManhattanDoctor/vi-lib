import { MatDialogRef } from '@angular/material';
import { Observable, Subject, Subscription } from 'rxjs';
import { IWindow } from './IWindow';
import { IWindowContent } from './IWindowContent';
import { WindowBase } from './WindowBase';
import { WindowConfig } from './WindowConfig';
import { WindowProperties } from './WindowProperties';
export declare class Window extends WindowBase implements IWindow {
    static BLINK_DELAY: number;
    static SHAKE_DELAY: number;
    static RESIZE_DELAY: number;
    private _isBlink;
    private blinkTimer;
    private _isShaking;
    private shakeTimer;
    private resizeTimer;
    private _isOnTop;
    private _isMinimized;
    private isOpened;
    private isWasOnTop;
    private _wrapper;
    private _backdrop;
    private _container;
    protected properties: WindowProperties;
    protected subscription: Subscription;
    protected observer: Subject<string>;
    constructor(properties: WindowProperties);
    protected setClosed: () => void;
    protected setOpened: () => void;
    protected blinkToggle: () => void;
    protected stopShaking: () => void;
    protected emitResize: () => void;
    protected setProperties(): void;
    protected commitIsBlinkProperties(): void;
    protected commitIsShakingProperties(): void;
    protected commitIsMinimizedProperties(): void;
    protected getConfig(): WindowConfig;
    protected getContainer(): HTMLElement;
    protected getReference(): MatDialogRef<IWindowContent>;
    protected isNeedClickStopPropagation(event: MouseEvent): boolean;
    private stopBlinkIfNeed;
    private resizeHandler;
    protected mouseDownHandler(event: MouseEvent): void;
    protected mouseClickHandler(event: MouseEvent): void;
    private mouseDownHandlerProxy;
    private mouseClickHandlerProxy;
    emit(event: string): void;
    close(): void;
    destroy(): void;
    blink(): void;
    shake(): void;
    setOnTop: () => void;
    getWidth(): number;
    getHeight(): number;
    setWidth(value: number, isNeedNotify?: boolean): void;
    setHeight(value: number, isNeedNotify?: boolean): void;
    setSize(width: number, height: number): void;
    getX(): number;
    setX(value: number, isNeedNotify?: boolean): void;
    getY(): number;
    setY(value: number, isNeedNotify?: boolean): void;
    move(x: number, y: number): void;
    protected isBlink: boolean;
    protected isShaking: boolean;
    protected readonly shakeClassName: string;
    readonly events: Observable<string>;
    readonly config: WindowConfig;
    readonly content: IWindowContent;
    readonly container: HTMLElement;
    readonly wrapper: HTMLElement;
    readonly backdrop: HTMLElement;
    isOnTop: boolean;
    isMinimized: boolean;
}
