import { Observable, Subject } from 'rxjs';
import { IDestroyable } from '../IDestroyable';
import { ObservableData } from '../observer/ObservableData';

export abstract class Loadable<U, V> implements IDestroyable {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected status: LoadableStatus;
    protected observer: Subject<ObservableData<U | LoadableEvent, V>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    protected constructor() {
        this.observer = new Subject();
        this.status = LoadableStatus.NOT_LOADED;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        this.observer = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get events(): Observable<ObservableData<U | LoadableEvent, V>> {
        return this.observer.asObservable();
    }

    public get isLoaded(): boolean {
        return this.status === LoadableStatus.LOADED;
    }
    public get isError(): boolean {
        return this.status === LoadableStatus.ERROR;
    }
    public get isLoading(): boolean {
        return this.status === LoadableStatus.LOADING;
    }
}

export enum LoadableEvent {
    ERROR = 'ERROR',
    STARTED = 'STARTED',
    COMPLETE = 'COMPLETE',
    FINISHED = 'FINISHED'
}

export enum LoadableStatus {
    ERROR = 'ERROR',
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    NOT_LOADED = 'NOT_LOADED'
}
