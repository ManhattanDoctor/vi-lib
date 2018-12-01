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
import { ObservableData } from '../observer/ObservableData';
import { LoginBaseService, LoginBaseServiceEvent } from './LoginBaseService';
var UserBaseService = (function () {
    function UserBaseService(login) {
        this.login = login;
        this.observer = new Subject();
    }
    UserBaseService.prototype.initialize = function () {
        var _this = this;
        if (this.login.isLoggedIn) {
            this._user = this.createUser(this.login.loginData);
            this.observer.next(new ObservableData(UserBaseServiceEvent.LOGINED, this.user));
        }
        this.login.events.subscribe(function (data) {
            if (data.type == LoginBaseServiceEvent.LOGIN_COMPLETE) {
                _this._user = _this.createUser(_this.login.loginData);
                _this.observer.next(new ObservableData(UserBaseServiceEvent.LOGINED, _this.user));
            }
            else if (data.type == LoginBaseServiceEvent.LOGOUT_FINISHED) {
                _this._user = null;
                _this.observer.next(new ObservableData(UserBaseServiceEvent.LOGOUTED));
            }
        });
    };
    UserBaseService.prototype.isUser = function (value) {
        if (!value || !this.user)
            return false;
        if (value.hasOwnProperty('id'))
            return this.user.id == value.id;
        return this.user.id == value;
    };
    UserBaseService.prototype.updateUser = function (data) {
        this.user.update(data);
        this.observer.next(new ObservableData(UserBaseServiceEvent.CHANGED));
    };
    Object.defineProperty(UserBaseService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBaseService.prototype, "hasUser", {
        get: function () {
            return this._user != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBaseService.prototype, "isLogined", {
        get: function () {
            return this.hasUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBaseService.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBaseService.prototype, "id", {
        get: function () {
            return this.hasUser ? this.user.id : null;
        },
        enumerable: true,
        configurable: true
    });
    UserBaseService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoginBaseService])
    ], UserBaseService);
    return UserBaseService;
}());
export { UserBaseService };
export var UserBaseServiceEvent;
(function (UserBaseServiceEvent) {
    UserBaseServiceEvent["LOGINED"] = "LOGINED";
    UserBaseServiceEvent["CHANGED"] = "CHANGED";
    UserBaseServiceEvent["LOGOUTED"] = "LOGOUTED";
})(UserBaseServiceEvent || (UserBaseServiceEvent = {}));
//# sourceMappingURL=../../../src/common/service/UserBaseService.js.map