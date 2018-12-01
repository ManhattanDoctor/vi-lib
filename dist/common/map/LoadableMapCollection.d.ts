import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDestroyable } from '../IDestroyable';
import { ObservableData } from '../observer/ObservableData';
import { DestroyableMapCollection } from './DestoyableMapCollection';
export declare abstract class LoadableMapCollection<U extends IDestroyable> extends DestroyableMapCollection<U> {
    protected _isDirty: boolean;
    protected _isLoading: boolean;
    protected _isAllLoaded: boolean;
    protected reloadTimer: any;
    protected reloadHandler: Function;
    protected isNeedCleanAfterLoad: boolean;
    protected subscription: Subscription;
    protected observer: Subject<ObservableData<LoadableMapCollectionEvent, void>>;
    constructor(uid?: string);
    protected parseItem(item: any): U;
    protected parseResponse(response: any): void;
    protected parseErrorResponse(response: any): void;
    protected isAbleToLoad(): boolean;
    protected makeRequest(): Observable<any>;
    reload(): void;
    reloadDefer(delay?: number): void;
    load(): void;
    reset(): void;
    destroy(): void;
    readonly events: Observable<ObservableData<LoadableMapCollectionEvent, void>>;
    readonly isLoading: boolean;
    readonly isDirty: boolean;
    readonly isAllLoaded: boolean;
}
export declare enum LoadableMapCollectionEvent {
    LOADING_ERROR = "LOADING_ERROR",
    LOADING_STARTED = "LOADING_STARTED",
    LOADING_COMPLETE = "LOADING_COMPLETE",
    LOADING_FINISHED = "LOADING_FINISHED",
    MAP_LENGTH_CHANGED = "MAP_LENGTH_CHANGED"
}
