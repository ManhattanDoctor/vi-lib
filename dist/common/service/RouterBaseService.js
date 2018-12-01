var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ObservableData } from '../observer/ObservableData';
import { StringUtil } from '../util/StringUtil';
import { NativeWindowService } from './NativeWindowService';
var RouterBaseService = (function () {
    function RouterBaseService(router, nativeWindow) {
        var _this = this;
        this.router = router;
        this.nativeWindow = nativeWindow;
        this.isNeedUpdateParams = false;
        this._isLoading = false;
        this.map = new Map();
        this.observer = new Subject();
        var params = this.nativeWindow.getParams();
        Object.keys(params).forEach(function (key) { return _this.map.set(key, params[key]); });
        this.initializeObservers();
    }
    RouterBaseService.prototype.initializeObservers = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart)
                _this.setLoading(true);
            else if (event instanceof NavigationEnd)
                _this.setLoading(false);
            else if (event instanceof NavigationCancel)
                _this.setLoading(false);
            else if (event instanceof NavigationError)
                _this.setLoading(false);
        });
    };
    RouterBaseService.prototype.applyParams = function (extras) {
        var params = {};
        params.queryParams = this.getQueryParams();
        if (extras)
            Object.assign(params, extras);
        if (this.isLoading) {
            this.isNeedUpdateParams = true;
            this.paramsExtras = extras;
        }
        else {
            this.router.navigate([], params);
        }
    };
    RouterBaseService.prototype.getQueryParams = function () {
        var params = {};
        this.map.forEach(function (value, key) { return (params[key] = value); });
        return params;
    };
    RouterBaseService.prototype.setLoading = function (value) {
        if (value == this._isLoading)
            return;
        this._isLoading = value;
        this.observer.next(new ObservableData(RouterBaseServiceEvent.LOADING_CHANGED));
        if (!this.isLoading && this.isNeedUpdateParams) {
            this.isNeedUpdateParams = false;
            this.applyParams(this.paramsExtras);
        }
    };
    RouterBaseService.prototype.navigate = function (url, extras) {
        var params = {};
        params.queryParams = this.getQueryParams();
        if (extras)
            Object.assign(params, extras);
        this.router.navigateByUrl(url, params);
    };
    RouterBaseService.prototype.navigateToExternalUrl = function (url, target) {
        if (target === void 0) { target = '_blank'; }
        this.nativeWindow.open(url, target);
    };
    RouterBaseService.prototype.navigateIfNotBusy = function (url, extras) {
        if (!this.isLoading)
            this.navigate(url, extras);
    };
    RouterBaseService.prototype.isUrlActive = function (value) {
        return StringUtil.isContains(this.url, value, false);
    };
    RouterBaseService.prototype.reload = function () {
        location.reload();
    };
    RouterBaseService.prototype.hasParam = function (name) {
        return this.map.has(name);
    };
    RouterBaseService.prototype.getParams = function () {
        var params = {};
        this.map.forEach(function (value, key) {
            params[key] = value;
        });
        return params;
    };
    RouterBaseService.prototype.getParam = function (name, valueIfNull) {
        if (valueIfNull === void 0) { valueIfNull = null; }
        return this.hasParam(name) ? this.map.get(name) : valueIfNull;
    };
    RouterBaseService.prototype.setParam = function (name, value, extras) {
        if (value) {
            value = value.toString().trim();
            if (value.length == 0)
                value = null;
        }
        if (value)
            this.map.set(name, value);
        else
            this.map.delete(name);
        if (!extras)
            extras = { replaceUrl: true };
        this.applyParams(extras);
    };
    RouterBaseService.prototype.removeParam = function (name, extras) {
        if (this.hasParam(name))
            this.setParam(name, null, extras);
    };
    Object.defineProperty(RouterBaseService.prototype, "hasParams", {
        get: function () {
            return this.map.size > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterBaseService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterBaseService.prototype, "url", {
        get: function () {
            return this.router.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterBaseService.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    RouterBaseService.ERROR_URL = 'error';
    RouterBaseService.MESSAGE_URL = 'message';
    RouterBaseService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, NativeWindowService])
    ], RouterBaseService);
    return RouterBaseService;
}());
export { RouterBaseService };
export var RouterBaseServiceEvent;
(function (RouterBaseServiceEvent) {
    RouterBaseServiceEvent["LOADING_CHANGED"] = "LOADING_CHANGED";
})(RouterBaseServiceEvent || (RouterBaseServiceEvent = {}));
//# sourceMappingURL=../../../src/common/service/RouterBaseService.js.map