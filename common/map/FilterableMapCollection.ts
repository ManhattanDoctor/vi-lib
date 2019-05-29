import { IDestroyable } from '../IDestroyable';
import { ArrayUtil } from '../util/ArrayUtil';
import { DestroyableMapCollection } from './DestoyableMapCollection';
import { IFilterFunction } from './IFilterFunction';

export class FilterableMapCollection<U extends IDestroyable> extends DestroyableMapCollection<U> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected _filtered: Array<U>;
    protected _filters: Array<IFilterFunction<U>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(uid: string = 'id') {
        super(uid);
        this._filters = [];
        this._filtered = [];
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected filter(item: U): boolean {
        if (this._filters.length === 0) return true;

        return this._filters.every(filter => {
            return filter(item);
        });
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public clear(): void {
        if (this.length > 0) ArrayUtil.clear(this._filtered);
        super.clear();
    }

    public add(item: U, isFirst: boolean = false): U {
        item = super.add(item, isFirst);
        if (item && this.filter(item)) {
            if (isFirst) this._filtered.unshift(item);
            else this._filtered.push(item);
        }

        return item;
    }
    public remove(key: string): U {
        let item = super.remove(key);
        if (item) {
            ArrayUtil.remove(this._filtered, item);
            item.destroy();
        }

        return item;
    }

    public refresh(): void {
        ArrayUtil.clear(this._filtered);
        if (this.length === 0) return;

        this.collection.forEach(item => {
            if (this.filter(item)) this._filtered.push(item);
        });
    }

    public destroy(): void {
        super.destroy();
        this._filtered = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get filtered(): Array<U> {
        return this._filtered;
    }

    public get filters(): Array<IFilterFunction<U>> {
        return this._filters;
    }
}
