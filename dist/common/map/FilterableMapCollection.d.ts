import { IDestroyable } from '../IDestroyable';
import { DestroyableMapCollection } from './DestoyableMapCollection';
import { IFilterFunction } from './IFilterFunction';
export declare class FilterableMapCollection<U extends IDestroyable> extends DestroyableMapCollection<U> {
    protected _filtered: Array<U>;
    protected _filters: Array<IFilterFunction<U>>;
    constructor(uid?: string);
    protected filter(item: U): boolean;
    clear(): void;
    add(item: U, isFirst?: boolean): U;
    remove(key: string): U;
    refresh(): void;
    destroy(): void;
    readonly filtered: Array<U>;
    readonly filters: Array<IFilterFunction<U>>;
}
