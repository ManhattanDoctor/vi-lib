var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Subject } from 'rxjs';
import { ObservableData } from '../observer/ObservableData';
import { DestroyableMapCollection } from './DestoyableMapCollection';
var LoadableMapCollection = (function (_super) {
    __extends(LoadableMapCollection, _super);
    function LoadableMapCollection(uid) {
        if (uid === void 0) { uid = 'id'; }
        var _this = _super.call(this, uid) || this;
        _this._isDirty = false;
        _this._isLoading = false;
        _this._isAllLoaded = false;
        _this.isNeedCleanAfterLoad = false;
        _this.observer = new Subject();
        _this.reloadHandler = _this.reload.bind(_this);
        return _this;
    }
    LoadableMapCollection.prototype.parseItem = function (item) {
        return null;
    };
    LoadableMapCollection.prototype.parseResponse = function (response) { };
    LoadableMapCollection.prototype.parseErrorResponse = function (response) { };
    LoadableMapCollection.prototype.isAbleToLoad = function () {
        return true;
    };
    LoadableMapCollection.prototype.makeRequest = function () {
        return null;
    };
    LoadableMapCollection.prototype.reload = function () {
        if (this.reloadTimer) {
            clearTimeout(this.reloadTimer);
            this.reloadTimer = null;
        }
        this._isDirty = true;
        this._isAllLoaded = false;
        this.isNeedCleanAfterLoad = true;
        this.load();
    };
    LoadableMapCollection.prototype.reloadDefer = function (delay) {
        if (delay === void 0) { delay = 500; }
        clearTimeout(this.reloadTimer);
        this.reloadTimer = setTimeout(this.reloadHandler, delay);
    };
    LoadableMapCollection.prototype.load = function () {
        var _this = this;
        if (this.isLoading || this.isAllLoaded || !this.isAbleToLoad())
            return;
        this._isDirty = true;
        this._isLoading = true;
        this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_STARTED));
        var subscription = this.makeRequest().subscribe(function (response) {
            subscription.unsubscribe();
            _this._isLoading = false;
            if (_this.isNeedCleanAfterLoad) {
                _this.isNeedCleanAfterLoad = false;
                _this.clear();
            }
            if (!response.isHasError) {
                _this.parseResponse(response);
                _this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_COMPLETE, response));
            }
            else {
                _this.parseErrorResponse(response);
                _this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_ERROR, response));
            }
            _this.observer.next(new ObservableData(LoadableMapCollectionEvent.LOADING_FINISHED));
        });
    };
    LoadableMapCollection.prototype.reset = function () {
        this._isDirty = false;
        this._isLoading = false;
        this._isAllLoaded = false;
        this.isNeedCleanAfterLoad = false;
        clearTimeout(this.reloadTimer);
        this.reloadTimer = null;
        this.clear();
    };
    LoadableMapCollection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.reloadHandler = null;
        this.observer = null;
    };
    Object.defineProperty(LoadableMapCollection.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadableMapCollection.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadableMapCollection.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadableMapCollection.prototype, "isAllLoaded", {
        get: function () {
            return this._isAllLoaded;
        },
        enumerable: true,
        configurable: true
    });
    return LoadableMapCollection;
}(DestroyableMapCollection));
export { LoadableMapCollection };
export var LoadableMapCollectionEvent;
(function (LoadableMapCollectionEvent) {
    LoadableMapCollectionEvent["LOADING_ERROR"] = "LOADING_ERROR";
    LoadableMapCollectionEvent["LOADING_STARTED"] = "LOADING_STARTED";
    LoadableMapCollectionEvent["LOADING_COMPLETE"] = "LOADING_COMPLETE";
    LoadableMapCollectionEvent["LOADING_FINISHED"] = "LOADING_FINISHED";
    LoadableMapCollectionEvent["MAP_LENGTH_CHANGED"] = "MAP_LENGTH_CHANGED";
})(LoadableMapCollectionEvent || (LoadableMapCollectionEvent = {}));
//# sourceMappingURL=../../../src/common/map/LoadableMapCollection.js.map