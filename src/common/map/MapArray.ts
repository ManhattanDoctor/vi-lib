import { ArrayUtil } from '../util/ArrayUtil';

export class MapArray<K, V> extends Map {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _collection: Array<V>;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
        this._collection = [];
    }

    //--------------------------------------------------------------------------
    //
    //	Private Methods
    //
    //--------------------------------------------------------------------------

    private remove(key: K): void {
        let value = this.get(key);
        if (value) ArrayUtil.remove(this._collection, value);
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public clear(): void {
        super.clear();
        ArrayUtil.clear(this._collection);
    }

    public delete(key: K): boolean {
        if (!key) return false;

        this.remove(key);
        return super.delete(key);
    }

    public set(key: K, value: V): this {
        if (!key) return;

        this.remove(key);
        this._collection.push(value);

        return super.set(key, value);
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get collection(): Array<V> {
        return this._collection;
    }
}
