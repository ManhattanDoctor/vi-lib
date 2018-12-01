import { LoginBaseServiceEvent } from '../service/LoginBaseService';
var LoginRequireResolver = (function () {
    function LoginRequireResolver(login) {
        this.login = login;
    }
    LoginRequireResolver.prototype.resolve = function (route, state) {
        var _this = this;
        if (this.login.isLoggedIn)
            return Promise.resolve();
        if (!this.login.isCanLoginWithSid())
            return Promise.reject("User can't login by sid");
        return new Promise(function (resolve, reject) {
            var subscription = _this.login.events.subscribe(function (data) {
                if (data.type == LoginBaseServiceEvent.LOGIN_ERROR)
                    reject(data.data.error.message);
                else if (data.type == LoginBaseServiceEvent.LOGIN_COMPLETE)
                    resolve();
                else if (data.type == LoginBaseServiceEvent.LOGIN_FINISHED)
                    subscription.unsubscribe();
            });
        });
    };
    return LoginRequireResolver;
}());
export { LoginRequireResolver };
//# sourceMappingURL=../../../src/common/resolver/LoginRequireResolver.js.map