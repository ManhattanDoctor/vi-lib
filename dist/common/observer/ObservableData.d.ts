export declare class ObservableData<U, V> {
    protected _type: U;
    protected _data: V;
    protected _error: Error;
    constructor(type: U, data?: V, error?: Error);
    readonly type: U;
    readonly data: V;
    readonly error: Error;
}
