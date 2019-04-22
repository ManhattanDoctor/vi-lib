import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { ObservableData } from '../observer/ObservableData';
import { DestroyableMapCollection } from './DestoyableMapCollection';

export abstract class LoadableMapCollection<U, V> extends DestroyableMapCollection<U> {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _isDirty: boolean = false;
    protected _isLoading: boolean = false;
    protected _isAllLoaded: boolean = false;

    protected reloadTimer: any;
    protected reloadHandler: (...args) => any;
    protected isNeedCleanAfterLoad: boolean = false;

    protected subscription: Subscription;
    protected observer: Subject<ObservableData<LoadableMapCollectionEvent, V>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    protected constructor(uid: string = 'id') {
        super(uid);
        this.observer = new Subject();
        this.reloadHandler = this.reload.bind(this);
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Abstract Methods
    //
    // --------------------------------------------------------------------------

    protected parseItem(item: any): U {
        return item;
    }

    protected parseResponse(response: any): void {}
    protected parseErrorResponse(response: any): void {}

    protected makeRequest(): Observable<any> {
        return null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public reload(): void {
        if (this.reloadTimer) {
            clearTimeout(this.reloadTimer);
            this.reloadTimer = null;
        }
        this._isDirty = true;
        this._isAllLoaded = false;
        this.isNeedCleanAfterLoad = true;
        this.load();
    }

    public reloadDefer(delay: number = 500): void {
        clearTimeout(this.reloadTimer);
        this.reloadTimer = setTimeout(this.reloadHandler, delay);
    }

    public load(): void {
        if (!this.isLoadable()) {
            return;
        }
        this._isDirty = true;
        this._isLoading = true;
        this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_STARTED));

        let subscription = this.makeRequest().subscribe(response => {
            subscription.unsubscribe();
            this._isLoading = false;

            if (this.isNeedCleanAfterLoad) {
                this.isNeedCleanAfterLoad = false;
                this.clear();
            }
            if (!response.isHasError) {
                this.parseResponse(response);
                this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_COMPLETE, response));
            } else {
                this.parseErrorResponse(response);
                this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_ERROR, response));
            }
            this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_FINISHED));
        });
    }

    public isLoadable(): boolean {
        if (this.isLoading || this.isAllLoaded) {
            return false;
        }
        return true;
    }

    public reset(): void {
        this._isDirty = false;
        this._isLoading = false;
        this._isAllLoaded = false;
        this.isNeedCleanAfterLoad = false;

        clearTimeout(this.reloadTimer);
        this.reloadTimer = null;

        this.clear();
    }

    public destroy(): void {
        super.destroy();
        this.reloadHandler = null;
        this.observer = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get events(): Observable<ObservableData<LoadableMapCollectionEvent, V>> {
        return this.observer.asObservable();
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get isDirty(): boolean {
        return this._isDirty;
    }

    public get isAllLoaded(): boolean {
        return this._isAllLoaded;
    }
}

export enum LoadableMapCollectionEvent {
    LOADING_ERROR = 'LOADING_ERROR',
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_COMPLETE = 'LOADING_COMPLETE',
    LOADING_FINISHED = 'LOADING_FINISHED',
    MAP_LENGTH_CHANGED = 'MAP_LENGTH_CHANGED'
}
