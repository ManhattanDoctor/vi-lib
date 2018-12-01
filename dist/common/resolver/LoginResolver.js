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
import { Injectable } from '@angular/core';
import { LoginBaseService } from '../service/LoginBaseService';
import { LoginRequireResolver } from './LoginRequireResolver';
var LoginResolver = (function (_super) {
    __extends(LoginResolver, _super);
    function LoginResolver(login) {
        return _super.call(this, login) || this;
    }
    LoginResolver.prototype.resolve = function (route, state) {
        return _super.prototype.resolve.call(this, route, state);
    };
    LoginResolver.redirectUrl = '/';
    LoginResolver.logoutUrl = '/login';
    LoginResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoginBaseService])
    ], LoginResolver);
    return LoginResolver;
}(LoginRequireResolver));
export { LoginResolver };
//# sourceMappingURL=../../../src/common/resolver/LoginResolver.js.map