import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NativeWindowService {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    private _isInFocus: boolean = true;
    private _isLoaded: boolean = false;

    private loadedTimer: any;
    private observer: Subject<NativeWindowServiceEvent>;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        this.observer = new Subject();
        this.checkLoadState();

        if (!this.isLoaded) this.loadedTimer = setInterval(this.checkLoadState, 500);

        window.addEventListener('blur', this.blurHandler);
        window.addEventListener('focus', this.focusHandler);
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private setIsInFocus(value: boolean) {
        if (value == this._isInFocus) return;

        this._isInFocus = value;
        this.observer.next(NativeWindowServiceEvent.FOCUS_CHANGED);
    }

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    private checkLoadState = (): void => {
        this._isLoaded = document.readyState == 'complete';
        if (this.isLoaded) {
            clearInterval(this.loadedTimer);
            this.observer.next(NativeWindowServiceEvent.LOADED);
        }
    };

    private blurHandler = (): void => {
        this.setIsInFocus(false);
    };

    private focusHandler = (): void => {
        this.setIsInFocus(true);
    };

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public getParam(name: string): string {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results: Array<string> = regex.exec(window.location.href);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    public getParams(): any {
        let params = [],
            hash;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');

            let key = decodeURIComponent(hash[0]);
            let value = decodeURIComponent(hash[1]);
            if (value && value != 'null' && value != 'undefined') params[key] = value;
        }
        return params;
    }

    public open(url?: string, target?: string): void {
        window.open(url, target);
    }

    public focus(): void {
        window.focus();
    }

    public blur(): void {
        window.blur();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<string> {
        return this.observer.asObservable();
    }

    public get isInFocus(): boolean {
        return this._isInFocus;
    }

    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    public get url(): string {
        return window.location.href;
    }

    public get title(): string {
        return document.title;
    }

    public set title(value: string) {
        document.title = value;
    }

    public get window(): any {
        return _window() as any;
    }
}

export enum NativeWindowServiceEvent {
    LOADED = 'LOADED',
    FOCUS_CHANGED = 'FOCUS_CHANGED'
}

function _window(): Window {
    return window;
}
