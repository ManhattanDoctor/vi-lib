import { UrlUtil } from '../util/UrlUtil';
var SettingsBaseService = (function () {
    function SettingsBaseService() {
        this._defaultLanguage = SettingsBaseService.LANGUAGE_EN;
    }
    SettingsBaseService.prototype.parseLanguages = function (value) {
        var map = new Map();
        var array = value.split(SettingsBaseService.LANGUAGE_SEPARATOR);
        array.forEach(function (item) {
            var language = item.split(SettingsBaseService.LANGUAGE_CODE_SEPARATOR);
            if (language.length == 2)
                map.set(language[0], language[1]);
        });
        return map;
    };
    SettingsBaseService.prototype.parseLanguage = function (value) {
        if (value == null)
            return value;
        value = value.toString();
        if (value == SettingsBaseService.LANGUAGE_EN_CODE)
            return SettingsBaseService.LANGUAGE_EN;
        if (value == SettingsBaseService.LANGUAGE_RU_CODE)
            return SettingsBaseService.LANGUAGE_RU;
        return value;
    };
    SettingsBaseService.prototype.parseUrl = function (value) {
        return UrlUtil.parseUrl(value);
    };
    SettingsBaseService.prototype.parseBoolean = function (value) {
        return value == 'true' || value == true;
    };
    SettingsBaseService.prototype.parseParams = function (keys, params) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var name_1 = keys_1[_i];
            this.parseParam(name_1, params[name_1]);
        }
    };
    SettingsBaseService.prototype.parseParam = function (name, value) {
        var variable = '_' + name;
        switch (name) {
            case 'apiUrl':
                this[variable] = this.parseUrl(value);
                break;
            case 'isRunOnServer':
            case 'isEthTestNet':
                this[variable] = this.parseBoolean(value);
                break;
            case 'language':
                this._language = this.parseLanguage(value);
                break;
            case 'defaultLanguage':
                this._defaultLanguage = this.parseLanguage(value);
                break;
            case 'availableLanguages':
                this._availableLanguages = this.parseLanguages(value);
                break;
            default:
                this[variable] = value;
                break;
        }
    };
    SettingsBaseService.prototype.getParamsFromCookies = function () { };
    SettingsBaseService.prototype.setParamsToCookies = function () { };
    SettingsBaseService.prototype.initialize = function (config, routerParams) {
        if (this.isInitialized)
            throw new Error('Service already initialized');
        this.isInitialized = true;
        var params = {};
        Object.assign(params, config);
        Object.assign(params, this.getParamsFromCookies());
        Object.assign(params, routerParams);
        var keys = Object.keys(params);
        this.parseParams(keys, params);
        this.setParamsToCookies();
    };
    Object.defineProperty(SettingsBaseService.prototype, "sid", {
        get: function () {
            return this._sid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "apiUrl", {
        get: function () {
            return this._apiUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "isRunOnServer", {
        get: function () {
            return this._isRunOnServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "defaultLanguage", {
        get: function () {
            return this._defaultLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "assetsUrl", {
        get: function () {
            return this._assetsUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "cookieDomain", {
        get: function () {
            return this._cookieDomain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "logoutUrl", {
        get: function () {
            return this._logoutUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsBaseService.prototype, "availableLanguages", {
        get: function () {
            return this._availableLanguages;
        },
        enumerable: true,
        configurable: true
    });
    SettingsBaseService.LANGUAGE_SEPARATOR = ';';
    SettingsBaseService.LANGUAGE_CODE_SEPARATOR = '|';
    SettingsBaseService.LANGUAGE_RU = 'ru';
    SettingsBaseService.LANGUAGE_RU_CODE = '0';
    SettingsBaseService.LANGUAGE_EN = 'en';
    SettingsBaseService.LANGUAGE_EN_CODE = '3';
    return SettingsBaseService;
}());
export { SettingsBaseService };
//# sourceMappingURL=../../../src/common/service/SettingsBaseService.js.map