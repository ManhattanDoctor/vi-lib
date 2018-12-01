import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ObservableData } from '../observer/ObservableData';
import { NativeWindowService } from './NativeWindowService';
export declare class RouterBaseService {
    protected router: Router;
    protected nativeWindow: NativeWindowService;
    static ERROR_URL: string;
    static MESSAGE_URL: string;
    static INSTANCE: RouterBaseService;
    protected map: Map<string, string>;
    protected observer: Subject<ObservableData<RouterBaseServiceEvent, void>>;
    protected paramsExtras: any;
    protected isNeedUpdateParams: boolean;
    protected _isLoading: boolean;
    constructor(router: Router, nativeWindow: NativeWindowService);
    protected initializeObservers(): void;
    protected applyParams(extras?: NavigationExtras): void;
    protected getQueryParams(): any;
    private setLoading;
    navigate(url: string, extras?: NavigationExtras): void;
    navigateToExternalUrl(url: string, target?: string): void;
    navigateIfNotBusy(url: string, extras?: NavigationExtras): void;
    isUrlActive(value: string): boolean;
    reload(): void;
    hasParam(name: string): boolean;
    getParams(): Object;
    getParam(name: string, valueIfNull?: string): string;
    setParam(name: string, value: any, extras?: NavigationExtras): void;
    removeParam(name: string, extras?: NavigationExtras): void;
    readonly hasParams: boolean;
    readonly events: Observable<ObservableData<RouterBaseServiceEvent, void>>;
    readonly url: string;
    readonly isLoading: boolean;
}
export declare enum RouterBaseServiceEvent {
    LOADING_CHANGED = "LOADING_CHANGED"
}
