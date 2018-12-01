import { ArrayUtil } from '../util/ArrayUtil';
var DestroyableContainer = (function () {
    function DestroyableContainer() {
        this.isDestroyed = false;
    }
    DestroyableContainer.prototype.addSubscription = function (value) {
        this.subscriptions.push(value);
        return value;
    };
    DestroyableContainer.prototype.removeSubscription = function (value) {
        if (this._subscriptions)
            ArrayUtil.remove(this._subscriptions, value);
    };
    DestroyableContainer.prototype.addDestroyable = function (value) {
        this.destroyables.push(value);
        return value;
    };
    DestroyableContainer.prototype.removeDestroyable = function (value) {
        if (this._destroyables)
            ArrayUtil.remove(this._destroyables, value);
    };
    DestroyableContainer.prototype.clearDestroyables = function () {
        if (this._destroyables)
            this._destroyables.forEach(function (destroyable) { return destroyable.destroy(); });
    };
    DestroyableContainer.prototype.clearSubscriptions = function () {
        if (this._subscriptions)
            this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    Object.defineProperty(DestroyableContainer.prototype, "subscriptions", {
        get: function () {
            if (!this._subscriptions)
                this._subscriptions = [];
            return this._subscriptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DestroyableContainer.prototype, "destroyables", {
        get: function () {
            if (!this._destroyables)
                this._destroyables = [];
            return this._destroyables;
        },
        enumerable: true,
        configurable: true
    });
    DestroyableContainer.prototype.destroy = function () {
        if (this.isDestroyed)
            return;
        this.isDestroyed = true;
        if (this._subscriptions) {
            this.clearSubscriptions();
            this._subscriptions = null;
        }
        if (this._destroyables) {
            this.clearDestroyables();
            this._destroyables = null;
        }
    };
    return DestroyableContainer;
}());
export { DestroyableContainer };
//# sourceMappingURL=../../../src/common/container/DestroyableContainer.js.map