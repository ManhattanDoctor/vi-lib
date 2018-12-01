export declare class MapCollection<U> {
    protected uid: string;
    protected map: Map<string, U>;
    protected _length: number;
    protected _collection: Array<U>;
    constructor(uid?: string);
    add(item: U, isFirst?: boolean): U;
    get(key: string): U;
    has(key: string): boolean;
    clear(): void;
    remove(key: string): U;
    move(oldIndex: number, newIndex: number): void;
    keys(): Array<string>;
    values(): Array<U>;
    clone(): MapCollection<U>;
    trackByFn: (index: number, item: U) => any;
    protected setLength(value: number): void;
    readonly length: number;
    readonly collection: Array<U>;
}
