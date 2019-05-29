import { Subscription } from 'rxjs';
import { IDestroyable } from '../IDestroyable';
import { ArrayUtil } from '../util/ArrayUtil';

export class DestroyableContainer implements IDestroyable {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _destroyables: IDestroyable[];
    private _subscriptions: Subscription[];

    protected isDestroyed: boolean = false;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {}

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    public addSubscription(value: Subscription): Subscription {
        this.subscriptions.push(value);
        return value;
    }
    public removeSubscription(value: Subscription): void {
        if (this._subscriptions) ArrayUtil.remove(this._subscriptions, value);
    }

    public addDestroyable(value: IDestroyable): IDestroyable {
        this.destroyables.push(value);
        return value;
    }
    public removeDestroyable(value: IDestroyable): void {
        if (this._destroyables) ArrayUtil.remove(this._destroyables, value);
    }

    public clearDestroyables(): void {
        if (this._destroyables) this._destroyables.forEach(destroyable => destroyable.destroy());
    }

    public clearSubscriptions(): void {
        if (this._subscriptions) this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    // --------------------------------------------------------------------------

    private get subscriptions(): Subscription[] {
        if (!this._subscriptions) this._subscriptions = [];
        return this._subscriptions;
    }
    private get destroyables(): IDestroyable[] {
        if (!this._destroyables) this._destroyables = [];
        return this._destroyables;
    }

    // --------------------------------------------------------------------------
    //
    // 	Interface Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) return;

        this.isDestroyed = true;
        if (this._subscriptions) {
            this.clearSubscriptions();
            this._subscriptions = null;
        }

        if (this._destroyables) {
            this.clearDestroyables();
            this._destroyables = null;
        }
    }
}
