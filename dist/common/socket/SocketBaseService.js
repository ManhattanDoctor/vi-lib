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
import { Loadable, LoadableStatus } from '../lib/Loadable';
var SocketBaseService = (function (_super) {
    __extends(SocketBaseService, _super);
    function SocketBaseService() {
        var _this = _super.call(this) || this;
        _this.socketOpenedHandler = function (event) {
            _this.status = LoadableStatus.LOADED;
            _this.openedHandler(event);
        };
        _this.socketErrorHandler = function (event) {
            _this.status = LoadableStatus.ERROR;
            _this.errorHandler(event);
        };
        _this.socketClosedHandler = function (event) {
            _this.status = LoadableStatus.NOT_LOADED;
            _this.closedHandler(event);
        };
        _this.socketMessageHandler = function (event) {
            _this.messageHandler(event);
        };
        return _this;
    }
    SocketBaseService.prototype.connect = function (url) {
        this.status = LoadableStatus.NOT_LOADED;
        this.socket = new WebSocket(url);
    };
    SocketBaseService.prototype.send = function (data) {
        if (!this.isLoaded)
            throw new Error('Socket must be opened first');
        console.log(data);
        this.socket.send(data);
    };
    SocketBaseService.prototype.disconnect = function () {
        this.socket = null;
        this.status = LoadableStatus.NOT_LOADED;
    };
    SocketBaseService.prototype.errorHandler = function (event) { };
    SocketBaseService.prototype.openedHandler = function (event) { };
    SocketBaseService.prototype.closedHandler = function (event) { };
    SocketBaseService.prototype.messageHandler = function (event) { };
    Object.defineProperty(SocketBaseService.prototype, "socket", {
        get: function () {
            return this._socket;
        },
        set: function (value) {
            if (value == this._socket)
                return;
            if (this._socket) {
                this._socket.removeEventListener('open', this.socketOpenedHandler);
                this._socket.removeEventListener('error', this.socketErrorHandler);
                this._socket.removeEventListener('close', this.socketClosedHandler);
                this._socket.removeEventListener('message', this.socketMessageHandler);
                if (this._socket.readyState == WebSocket.OPEN || this._socket.readyState == WebSocket.CONNECTING)
                    this._socket.close();
            }
            this._socket = value;
            if (this._socket) {
                this._socket.addEventListener('open', this.socketOpenedHandler);
                this._socket.addEventListener('error', this.socketErrorHandler);
                this._socket.addEventListener('close', this.socketClosedHandler);
                this._socket.addEventListener('message', this.socketMessageHandler);
            }
        },
        enumerable: true,
        configurable: true
    });
    SocketBaseService.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.disconnect();
    };
    Object.defineProperty(SocketBaseService.prototype, "url", {
        get: function () {
            return this.socket ? this.socket.url : null;
        },
        enumerable: true,
        configurable: true
    });
    SocketBaseService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], SocketBaseService);
    return SocketBaseService;
}(Loadable));
export { SocketBaseService };
//# sourceMappingURL=../../../src/common/socket/SocketBaseService.js.map