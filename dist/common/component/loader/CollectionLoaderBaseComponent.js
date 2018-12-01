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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input } from '@angular/core';
import { LoadableMapCollection, LoadableMapCollectionEvent } from '../../map/LoadableMapCollection';
import { ViewUtil } from '../../util/ViewUtil';
import { LoaderBaseComponent } from './LoaderBaseComponent';
var CollectionLoaderBaseComponent = (function (_super) {
    __extends(CollectionLoaderBaseComponent, _super);
    function CollectionLoaderBaseComponent(element) {
        var _this = _super.call(this, element) || this;
        _this._isAllLoaded = false;
        _this.loadingText = 'Loading...';
        _this.emptyText = 'Collection is empty...';
        return _this;
    }
    CollectionLoaderBaseComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.collection = null;
    };
    Object.defineProperty(CollectionLoaderBaseComponent.prototype, "isAllLoaded", {
        get: function () {
            return this._isAllLoaded;
        },
        set: function (value) {
            if (value == this._isAllLoaded)
                return;
            this._isAllLoaded = value;
            ViewUtil.toggleClass(this.element, 'is-all-loaded', this.isAllLoaded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionLoaderBaseComponent.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            var _this = this;
            if (value == this._collection)
                return;
            if (this.subscription)
                this.subscription.unsubscribe();
            this._collection = value;
            if (this._collection) {
                this.isLoading = this._collection.isLoading;
                if (!this.isLoading)
                    this.isEmpty = this.collection.length == 0;
                this.subscription = this._collection.events.subscribe(function (data) {
                    if (data.type == LoadableMapCollectionEvent.LOADING_STARTED) {
                        _this.isEmpty = _this.collection.length == 0;
                        _this.isLoading = true;
                    }
                    else if (data.type == LoadableMapCollectionEvent.LOADING_FINISHED) {
                        _this.isEmpty = _this.collection.length == 0;
                        _this.isLoading = false;
                        _this.isAllLoaded = _this.collection.isAllLoaded;
                    }
                    else if (data.type == LoadableMapCollectionEvent.MAP_LENGTH_CHANGED) {
                        _this.isEmpty = _this.collection.length == 0;
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", LoadableMapCollection),
        __metadata("design:paramtypes", [LoadableMapCollection])
    ], CollectionLoaderBaseComponent.prototype, "collection", null);
    return CollectionLoaderBaseComponent;
}(LoaderBaseComponent));
export { CollectionLoaderBaseComponent };
//# sourceMappingURL=../../../../src/common/component/loader/CollectionLoaderBaseComponent.js.map