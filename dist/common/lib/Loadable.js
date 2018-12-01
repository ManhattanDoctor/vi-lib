import { Subject } from 'rxjs';
var Loadable = (function () {
    function Loadable() {
        this.observer = new Subject();
        this.status = LoadableStatus.NOT_LOADED;
    }
    Loadable.prototype.destroy = function () {
        this.observer = null;
    };
    Object.defineProperty(Loadable.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loadable.prototype, "isLoaded", {
        get: function () {
            return this.status == LoadableStatus.LOADED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loadable.prototype, "isError", {
        get: function () {
            return this.status == LoadableStatus.ERROR;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loadable.prototype, "isLoading", {
        get: function () {
            return this.status == LoadableStatus.LOADING;
        },
        enumerable: true,
        configurable: true
    });
    return Loadable;
}());
export { Loadable };
export var LoadableEvent;
(function (LoadableEvent) {
    LoadableEvent["ERROR"] = "ERROR";
    LoadableEvent["STARTED"] = "STARTED";
    LoadableEvent["COMPLETE"] = "COMPLETE";
    LoadableEvent["FINISHED"] = "FINISHED";
})(LoadableEvent || (LoadableEvent = {}));
export var LoadableStatus;
(function (LoadableStatus) {
    LoadableStatus["ERROR"] = "ERROR";
    LoadableStatus["LOADED"] = "LOADED";
    LoadableStatus["LOADING"] = "LOADING";
    LoadableStatus["NOT_LOADED"] = "NOT_LOADED";
})(LoadableStatus || (LoadableStatus = {}));
//# sourceMappingURL=../../../src/common/lib/Loadable.js.map