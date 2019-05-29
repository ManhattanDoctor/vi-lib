import { ArrayUtil } from '../util/ArrayUtil';

export class MapCollection<U> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    protected uid: string;
    protected map: Map<string, U>;

    protected _length: number;
    protected _collection: Array<U>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(uid: string = 'id') {
        this.uid = uid;
        this.map = new Map();

        this._length = 0;
        this._collection = [];
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public add(item: U, isFirst: boolean = false): U {
        if (!item) {
            return null;
        }

        let key = null;
        try {
            key = item[this.uid];
        } catch (error) {}

        if (typeof key === 'undefined' || key === null) {
            return null;
        }

        key = key.toString();
        if (this.has(key)) {
            return null;
        }

        if (isFirst) {
            this._collection.unshift(item);
        } else {
            this._collection.push(item);
        }

        this.map.set(key, item);
        this.updateCollectionLength();

        return item;
    }

    public get(key: string): U {
        return key ? this.map.get(key.toString()) : null;
    }

    public has(key: string): boolean {
        return key ? this.map.has(key.toString()) : null;
    }

    public clear() {
        this.map.clear();
        this._collection.splice(0, this.length);
        this.updateCollectionLength();
    }

    public remove(key: string): U {
        if (!this.has(key)) {
            return null;
        }

        let item = this.get(key);
        if (ArrayUtil.remove(this._collection, item)) {
            this.updateCollectionLength();
        }

        this.map.delete(key.toString());

        return item;
    }

    public move(oldIndex: number, newIndex: number): void {
        ArrayUtil.move(this._collection, oldIndex, newIndex);
    }

    public keys(): Array<string> {
        let array = [];
        this.map.forEach((item, key) => array.push(key));
        return array;
    }

    public values(): Array<U> {
        let array = [];
        this.map.forEach(item => array.push(item));
        return array;
    }

    public clone(): MapCollection<U> {
        let map = new MapCollection<U>(this.uid);
        this._collection.forEach(item => map.add(item));
        return map;
    }

    public trackByFn = (index: number, item: U): any => {
        let key = null;
        try {
            key = item[this.uid];
        } catch (error) {}

        return key || index;
    };

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected updateCollectionLength(): void {
        this._length = this._collection.length;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get length(): number {
        return this._length;
    }

    public get collection(): Array<U> {
        return this._collection;
    }
}
