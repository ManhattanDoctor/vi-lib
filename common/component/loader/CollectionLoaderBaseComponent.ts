import { ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadableMapCollection, LoadableMapCollectionEvent } from '../../map/LoadableMapCollection';
import { ViewUtil } from '../../util/ViewUtil';
import { LoaderBaseComponent } from './LoaderBaseComponent';

export class CollectionLoaderBaseComponent extends LoaderBaseComponent {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected _collection: LoadableMapCollection<any>;
    protected _isAllLoaded: boolean = false;

    protected subscription: Subscription;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ElementRef) {
        super(element);
        this.loadingText = 'Loading...';
        this.emptyText = 'Collection is empty...';
    }

    // --------------------------------------------------------------------------
    //
    // 	Interface Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this.collection = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get isAllLoaded(): boolean {
        return this._isAllLoaded;
    }
    protected set isAllLoaded(value: boolean) {
        if (value === this._isAllLoaded) return;

        this._isAllLoaded = value;
        ViewUtil.toggleClass(this.element, 'is-all-loaded', this.isAllLoaded);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    @Input()
    public set collection(value: LoadableMapCollection<any>) {
        if (value === this._collection) return;

        if (this.subscription) this.subscription.unsubscribe();

        this._collection = value;

        if (this._collection) {
            this.isLoading = this._collection.isLoading;

            if (!this.isLoading) this.isEmpty = this.collection.length === 0;

            this.subscription = this._collection.events.subscribe(data => {
                if (data.type === LoadableMapCollectionEvent.LOADING_STARTED) {
                    this.isEmpty = this.collection.length === 0;
                    this.isLoading = true;
                } else if (data.type === LoadableMapCollectionEvent.LOADING_FINISHED) {
                    this.isEmpty = this.collection.length === 0;
                    this.isLoading = false;
                    this.isAllLoaded = this.collection.isAllLoaded;
                } else if (data.type === LoadableMapCollectionEvent.MAP_LENGTH_CHANGED) {
                    this.isEmpty = this.collection.length === 0;
                }
            });
        }
    }
    public get collection(): LoadableMapCollection<any> {
        return this._collection;
    }
}
