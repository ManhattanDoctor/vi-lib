import { Observable, Subject } from 'rxjs';
import { IDestroyable } from '../IDestroyable';
import { ObservableData } from '../observer/ObservableData';
export declare abstract class Loadable<U, V> implements IDestroyable {
    protected status: LoadableStatus;
    protected observer: Subject<ObservableData<U | LoadableEvent, V>>;
    protected constructor();
    destroy(): void;
    readonly events: Observable<ObservableData<U | LoadableEvent, V>>;
    readonly isLoaded: boolean;
    readonly isError: boolean;
    readonly isLoading: boolean;
}
export declare enum LoadableEvent {
    ERROR = "ERROR",
    STARTED = "STARTED",
    COMPLETE = "COMPLETE",
    FINISHED = "FINISHED"
}
export declare enum LoadableStatus {
    ERROR = "ERROR",
    LOADED = "LOADED",
    LOADING = "LOADING",
    NOT_LOADED = "NOT_LOADED"
}
