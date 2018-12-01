import { Subscription } from 'rxjs';
import { IDestroyable } from '../IDestroyable';
export declare class DestroyableContainer implements IDestroyable {
    private _destroyables;
    private _subscriptions;
    protected isDestroyed: boolean;
    constructor();
    addSubscription(value: Subscription): Subscription;
    removeSubscription(value: Subscription): void;
    addDestroyable(value: IDestroyable): IDestroyable;
    removeDestroyable(value: IDestroyable): void;
    clearDestroyables(): void;
    clearSubscriptions(): void;
    private readonly subscriptions;
    private readonly destroyables;
    destroy(): void;
}
