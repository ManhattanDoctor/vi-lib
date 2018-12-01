import { Loadable, LoadableEvent } from '../lib/Loadable';
export declare abstract class SequienceExecutor<U, V> extends Loadable<LoadableEvent, SequienceExecutorData<U, V>> {
    protected inputs: Array<U>;
    protected isDestroyed: boolean;
    protected delayTimeout: number;
    private _progress;
    private _totalLength;
    private _currentIndex;
    constructor();
    protected finishedInput(input: U): void;
    protected skipInput(input: U): void;
    protected checkProgress(): void;
    protected makeStarted(): void;
    protected makeFinished(): void;
    protected delay(timeout?: number): Promise<void>;
    protected nextIndex(): void;
    protected nextInput(): void;
    protected addInput(input: U): void;
    protected abstract executeInput(value: U): Promise<V>;
    private currentIndex;
    private totalLength;
    start(inputs: Array<U>): void;
    stop(): void;
    destroy(): void;
    readonly progress: number;
}
export declare enum SequienceExecutorError {
    SKIP = "SKIP"
}
export interface SequienceExecutorData<U, V> {
    input: U;
    output?: V;
    error?: Error;
}
