import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadableMapCollection } from '../../map/LoadableMapCollection';
import { LoaderBaseComponent } from './LoaderBaseComponent';
export declare class CollectionLoaderBaseComponent extends LoaderBaseComponent {
    protected _collection: LoadableMapCollection<any>;
    protected _isAllLoaded: boolean;
    protected subscription: Subscription;
    constructor(element: ElementRef);
    destroy(): void;
    protected isAllLoaded: boolean;
    collection: LoadableMapCollection<any>;
}
