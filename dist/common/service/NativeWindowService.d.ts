import { Observable } from 'rxjs';
export declare class NativeWindowService {
    private _isInFocus;
    private _isLoaded;
    private loadedTimer;
    private observer;
    constructor();
    private setIsInFocus;
    private checkLoadState;
    private blurHandler;
    private focusHandler;
    getParam(name: string): string;
    getParams(): any;
    open(url?: string, target?: string): void;
    focus(): void;
    blur(): void;
    readonly events: Observable<string>;
    readonly isInFocus: boolean;
    readonly isLoaded: boolean;
    readonly url: string;
    title: string;
    readonly window: any;
}
export declare enum NativeWindowServiceEvent {
    LOADED = "LOADED",
    FOCUS_CHANGED = "FOCUS_CHANGED"
}
