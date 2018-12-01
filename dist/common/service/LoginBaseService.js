import { Subject } from 'rxjs';
import { ObservableData } from '../observer/ObservableData';
var LoginBaseService = (function () {
    function LoginBaseService() {
        this._isLoading = false;
        this._isLoggedIn = false;
        this.observer = new Subject();
    }
    LoginBaseService.prototype.loginByParam = function (param) {
        var _this = this;
        if (this.isLoggedIn || this.isLoading)
            return;
        this._isLoading = true;
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_STARTED));
        var subscription = this.makeLoginParamRequest(param).subscribe(function (response) {
            subscription.unsubscribe();
            _this._isLoading = false;
            if (!response.isHasError) {
                _this.parseLoginParamResponse(response);
                if (_this.isCanLoginWithSid())
                    _this.loginBySid();
            }
            else {
                _this.parseLoginParamErrorResponse(response);
                _this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_ERROR, response));
                _this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_FINISHED, response));
            }
        });
    };
    LoginBaseService.prototype.loginBySid = function (isNeedHandleError, isHandleLoading) {
        var _this = this;
        if (isNeedHandleError === void 0) { isNeedHandleError = true; }
        if (isHandleLoading === void 0) { isHandleLoading = false; }
        if (!this.sid)
            this._sid = this.getSavedSid();
        this._isLoading = true;
        var subscription = this.makeLoginSidRequest(isNeedHandleError, isHandleLoading).subscribe(function (response) {
            subscription.unsubscribe();
            _this._isLoading = false;
            _this._isLoggedIn = !response.isHasError;
            if (!response.isHasError) {
                _this.parseLoginSidResponse(response);
                _this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_COMPLETE, response));
            }
            else {
                _this.parseLoginSidErrorResponse(response);
                _this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_ERROR, response));
            }
            _this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_FINISHED, response));
        });
    };
    LoginBaseService.prototype.reset = function () {
        this._sid = null;
        this._resource = null;
    };
    LoginBaseService.prototype.parseLoginParamErrorResponse = function (response) { };
    LoginBaseService.prototype.parseLoginSidResponse = function (response) {
        this._loginData = response.data;
    };
    LoginBaseService.prototype.parseLoginSidErrorResponse = function (response) {
        if (!response.error.isSystem)
            this.reset();
    };
    LoginBaseService.prototype.tryLoginBySid = function (isNeedHandleError, isHandleLoading) {
        if (isNeedHandleError === void 0) { isNeedHandleError = true; }
        if (isHandleLoading === void 0) { isHandleLoading = false; }
        if (!this.isCanLoginWithSid())
            return false;
        if (!this.isLoggedIn && !this.isLoading) {
            this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_STARTED));
            this.loginBySid(isNeedHandleError, isHandleLoading);
        }
        return true;
    };
    LoginBaseService.prototype.logout = function () {
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGOUT_STARTED));
        if (this.isLoggedIn)
            this.makeLogoutRequest();
        this.reset();
        this._isLoggedIn = false;
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGOUT_FINISHED));
    };
    LoginBaseService.prototype.isCanLoginWithSid = function () {
        return this.sid != null || this.getSavedSid() != null;
    };
    Object.defineProperty(LoginBaseService.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginBaseService.prototype, "sid", {
        get: function () {
            return this._sid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginBaseService.prototype, "resource", {
        get: function () {
            return this._resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginBaseService.prototype, "loginData", {
        get: function () {
            return this._loginData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginBaseService.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginBaseService.prototype, "isLoggedIn", {
        get: function () {
            return this._isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    return LoginBaseService;
}());
export { LoginBaseService };
export var LoginBaseServiceEvent;
(function (LoginBaseServiceEvent) {
    LoginBaseServiceEvent["LOGIN_ERROR"] = "LOGIN_ERROR";
    LoginBaseServiceEvent["LOGIN_STARTED"] = "LOGIN_STARTED";
    LoginBaseServiceEvent["LOGIN_COMPLETE"] = "LOGIN_COMPLETE";
    LoginBaseServiceEvent["LOGIN_FINISHED"] = "LOGIN_FINISHED";
    LoginBaseServiceEvent["LOGOUT_STARTED"] = "LOGOUT_STARTED";
    LoginBaseServiceEvent["LOGOUT_FINISHED"] = "LOGOUT_FINISHED";
})(LoginBaseServiceEvent || (LoginBaseServiceEvent = {}));
//# sourceMappingURL=../../../src/common/service/LoginBaseService.js.map