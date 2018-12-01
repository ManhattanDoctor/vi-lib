export declare class MapArray<K, V> extends Map {
    protected _collection: Array<V>;
    constructor();
    private remove;
    clear(): void;
    delete(key: K): boolean;
    set(key: K, value: V): this;
    readonly collection: Array<V>;
}
