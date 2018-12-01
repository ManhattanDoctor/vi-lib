import { NavigationCancel, NavigationEnd, NavigationError, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ObservableData } from '../observer/ObservableData';
import { StringUtil } from '../util/StringUtil';
import { NativeWindowService } from './NativeWindowService';

@Injectable()
export class RouterBaseService {
    //--------------------------------------------------------------------------
    //
    //	Static Methods
    //
    //--------------------------------------------------------------------------

    public static ERROR_URL = 'error';
    public static MESSAGE_URL = 'message';

    public static INSTANCE: RouterBaseService;

    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected map: Map<string, string>;
    protected observer: Subject<ObservableData<RouterBaseServiceEvent, void>>;

    protected paramsExtras: any;
    protected isNeedUpdateParams: boolean = false;

    protected _isLoading: boolean = false;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(protected router: Router, protected nativeWindow: NativeWindowService) {
        this.map = new Map();
        this.observer = new Subject();

        let params = this.nativeWindow.getParams();
        Object.keys(params).forEach(key => this.map.set(key, params[key]));

        this.initializeObservers();
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initializeObservers(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) this.setLoading(true);
            else if (event instanceof NavigationEnd) this.setLoading(false);
            else if (event instanceof NavigationCancel) this.setLoading(false);
            else if (event instanceof NavigationError) this.setLoading(false);
        });
    }

    protected applyParams(extras?: NavigationExtras): void {
        let params = {} as NavigationExtras;
        params.queryParams = this.getQueryParams();
        if (extras) Object.assign(params, extras);

        if (this.isLoading) {
            this.isNeedUpdateParams = true;
            this.paramsExtras = extras;
        } else {
            this.router.navigate([], params);
        }
    }

    protected getQueryParams(): any {
        let params = {} as any;
        this.map.forEach((value, key) => (params[key] = value));
        return params;
    }

    private setLoading(value: boolean) {
        if (value == this._isLoading) return;

        this._isLoading = value;
        this.observer.next(new ObservableData(RouterBaseServiceEvent.LOADING_CHANGED));

        if (!this.isLoading && this.isNeedUpdateParams) {
            this.isNeedUpdateParams = false;
            this.applyParams(this.paramsExtras);
        }
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public navigate(url: string, extras?: NavigationExtras): void {
        let params = {} as NavigationExtras;
        params.queryParams = this.getQueryParams();
        if (extras) Object.assign(params, extras);

        this.router.navigateByUrl(url, params);
    }

    public navigateToExternalUrl(url: string, target: string = '_blank'): void {
        this.nativeWindow.open(url, target);
    }

    public navigateIfNotBusy(url: string, extras?: NavigationExtras): void {
        if (!this.isLoading) this.navigate(url, extras);
    }

    public isUrlActive(value: string): boolean {
        return StringUtil.isContains(this.url, value, false);
    }

    public reload(): void {
        location.reload();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Param Methods
    //
    //--------------------------------------------------------------------------

    public hasParam(name: string): boolean {
        return this.map.has(name);
    }

    public getParams(): Object {
        let params = {} as any;
        this.map.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    public getParam(name: string, valueIfNull: string = null): string {
        return this.hasParam(name) ? this.map.get(name) : valueIfNull;
    }

    public setParam(name: string, value: any, extras?: NavigationExtras): void {
        if (value) {
            value = value.toString().trim();
            if (value.length == 0) value = null;
        }

        if (value) this.map.set(name, value);
        else this.map.delete(name);

        if (!extras) extras = { replaceUrl: true };

        this.applyParams(extras);
    }

    public removeParam(name: string, extras?: NavigationExtras): void {
        if (this.hasParam(name)) this.setParam(name, null, extras);
    }

    public get hasParams(): boolean {
        return this.map.size > 0;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Url Methods
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<ObservableData<RouterBaseServiceEvent, void>> {
        return this.observer.asObservable();
    }

    public get url(): string {
        return this.router.url;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }
}

export enum RouterBaseServiceEvent {
    LOADING_CHANGED = 'LOADING_CHANGED'
}
