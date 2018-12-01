var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var NativeWindowService = (function () {
    function NativeWindowService() {
        var _this = this;
        this._isInFocus = true;
        this._isLoaded = false;
        this.checkLoadState = function () {
            _this._isLoaded = document.readyState == 'complete';
            if (_this.isLoaded) {
                clearInterval(_this.loadedTimer);
                _this.observer.next(NativeWindowServiceEvent.LOADED);
            }
        };
        this.blurHandler = function () {
            _this.setIsInFocus(false);
        };
        this.focusHandler = function () {
            _this.setIsInFocus(true);
        };
        this.observer = new Subject();
        this.checkLoadState();
        if (!this.isLoaded)
            this.loadedTimer = setInterval(this.checkLoadState, 500);
        window.addEventListener('blur', this.blurHandler);
        window.addEventListener('focus', this.focusHandler);
    }
    NativeWindowService.prototype.setIsInFocus = function (value) {
        if (value == this._isInFocus)
            return;
        this._isInFocus = value;
        this.observer.next(NativeWindowServiceEvent.FOCUS_CHANGED);
    };
    NativeWindowService.prototype.getParam = function (name) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(window.location.href);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    NativeWindowService.prototype.getParams = function () {
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            var key = decodeURIComponent(hash[0]);
            var value = decodeURIComponent(hash[1]);
            if (value && value != 'null' && value != 'undefined')
                params[key] = value;
        }
        return params;
    };
    NativeWindowService.prototype.open = function (url, target) {
        window.open(url, target);
    };
    NativeWindowService.prototype.focus = function () {
        window.focus();
    };
    NativeWindowService.prototype.blur = function () {
        window.blur();
    };
    Object.defineProperty(NativeWindowService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeWindowService.prototype, "isInFocus", {
        get: function () {
            return this._isInFocus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeWindowService.prototype, "isLoaded", {
        get: function () {
            return this._isLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeWindowService.prototype, "url", {
        get: function () {
            return window.location.href;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeWindowService.prototype, "title", {
        get: function () {
            return document.title;
        },
        set: function (value) {
            document.title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeWindowService.prototype, "window", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    NativeWindowService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], NativeWindowService);
    return NativeWindowService;
}());
export { NativeWindowService };
export var NativeWindowServiceEvent;
(function (NativeWindowServiceEvent) {
    NativeWindowServiceEvent["LOADED"] = "LOADED";
    NativeWindowServiceEvent["FOCUS_CHANGED"] = "FOCUS_CHANGED";
})(NativeWindowServiceEvent || (NativeWindowServiceEvent = {}));
function _window() {
    return window;
}
//# sourceMappingURL=../../../src/common/service/NativeWindowService.js.map