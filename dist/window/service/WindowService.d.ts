import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { IQuestion } from '../../common/IQuestion';
import { ObservableData } from '../../common/observer/ObservableData';
import { LanguageService } from '../../language/service/LanguageService';
import { IWindow } from '../lib/IWindow';
import { IWindowContent } from '../lib/IWindowContent';
import { WindowAlign, WindowConfig } from '../lib/WindowConfig';
import { WindowFactory } from '../lib/WindowFactory';
export declare class WindowService {
    private dialog;
    private language;
    private cookies;
    static GAP_X: number;
    static GAP_Y: number;
    private static TOP_Z_INDEX;
    static DEFAULT_MIN_WIDTH: number;
    static DEFAULT_MIN_HEIGHT: number;
    static DEFAULT_PADDING_TOP: number;
    static DEFAULT_PADDING_LEFT: number;
    static DEFAULT_PADDING_RIGHT: number;
    static DEFAULT_PADDING_BOTTOM: number;
    static DEFAULT_VERTICAL_ALIGN: WindowAlign;
    static DEFAULT_HORIZONTAL_ALIGN: WindowAlign;
    factory: WindowFactory<IWindow>;
    questionWindow: ComponentType<IWindowContent>;
    isNeedCheckWindowPositionAfterOpen: boolean;
    private _windows;
    private _windowsArray;
    private properties;
    private observer;
    constructor(dialog: MatDialog, language: LanguageService, cookies: CookieService);
    private sortFunction;
    private setWindowOnTop;
    private updateTopWindow;
    private checkWindowPosition;
    private hasWindowWithSamePosition;
    private add;
    private remove;
    private get;
    openWindow(component: ComponentType<IWindowContent>, config: WindowConfig): IWindowContent;
    getWindow(value: WindowConfig | string): IWindowContent;
    hasWindow(value: WindowConfig | string): boolean;
    removeAll(): void;
    setWindowOnTopIfExist(value: WindowConfig | string): boolean;
    info(translationId?: string, translation?: any): IQuestion;
    question(translationId?: string, translation?: any): IQuestion;
    readonly events: Observable<ObservableData<WindowServiceEvent, IWindow>>;
    readonly windows: Map<WindowConfig, IWindowContent>;
}
export declare class PropertiesManager {
    private cookies;
    constructor(cookies: CookieService);
    load(name: string, config: WindowConfig): void;
    save(name: string, window: IWindow): void;
}
export declare enum WindowServiceEvent {
    OPENED = "OPENED",
    CLOSED = "CLOSED",
    SETTED_ON_TOP = "SETTED_ON_TOP"
}
