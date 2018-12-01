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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Loadable, LoadableEvent, LoadableStatus } from '../../common/lib/Loadable';
import { MapCollection } from '../../common/map/MapCollection';
import { ObservableData } from '../../common/observer/ObservableData';
import { ObjectUtil } from '../../common/util/ObjectUtil';
import { Language } from '../lib/Language';
import { LanguageMessageFormatParser } from '../lib/LanguageMessageFormatParser';
var LanguageService = (function (_super) {
    __extends(LanguageService, _super);
    function LanguageService(http, cookies, translation) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.cookies = cookies;
        _this.translation = translation;
        _this._availableLanguages = new MapCollection();
        _this.parser = translation.parser;
        _this.parser.events.subscribe(function (data) {
            if (data.type == LanguageServiceEvent.PARSE_ERROR)
                console.log('Language parse error: ' + data.data);
        });
        return _this;
    }
    LanguageService.forRoot = function () {
        return TranslateModule.forRoot({
            parser: {
                provide: TranslateParser,
                useClass: LanguageMessageFormatParser
            }
        });
    };
    LanguageService.createTranslateAuthorProperties = function (user, properties) {
        if (properties === void 0) { properties = null; }
        if (!properties)
            properties = {};
        if (user) {
            properties.authorId = user.id;
            properties.authorName = user.name;
            properties.authorMale = user.isMale;
            properties.authorPicture = user.picture;
            properties.authorClass = user.isMale ? 'male' : 'female';
        }
        return properties;
    };
    LanguageService.createTranslateReceiverProperties = function (user, properties) {
        if (properties === void 0) { properties = null; }
        if (!properties)
            properties = {};
        if (user) {
            properties.receiverId = user.id;
            properties.receiverName = user.name;
            properties.receiverMale = user.isMale;
            properties.receiverPicture = user.picture;
            properties.receiverClass = user.isMale ? 'male' : 'female';
        }
        return properties;
    };
    LanguageService.prototype.loadLanguage = function (language) {
        var _this = this;
        this.status = LoadableStatus.LOADING;
        this.observer.next(new ObservableData(LoadableEvent.STARTED, language));
        if (this.subscription)
            this.subscription.unsubscribe();
        this.subscription = this.http.get(this.getLanguageUrl(language)).subscribe(function (json) {
            _this.subscription.unsubscribe();
            _this.subscription = _this.http.get(_this.getCustomLanguageUrl(language)).subscribe(function (jsonCustom) {
                var translation = ObjectUtil.deepExtend(json, jsonCustom);
                _this.setLanguage(language, translation);
            }, function (error) {
                _this.setLanguage(language, json);
            });
        }, function (error) {
            _this.status = LoadableStatus.ERROR;
            _this.observer.next(new ObservableData(LoadableEvent.ERROR, language, error.error.error));
            _this.observer.next(new ObservableData(LoadableEvent.FINISHED, language));
        });
    };
    LanguageService.prototype.setLanguage = function (language, translation) {
        this._language = language;
        this._rawTranslationData = translation;
        this.cookies.put('language', language.locale);
        this.translation.setTranslation(language.locale, translation);
        this.translation.use(language.locale);
        this.parser.locale = language.locale;
        this.status = LoadableStatus.LOADED;
        this.observer.next(new ObservableData(LoadableEvent.COMPLETE, language));
        this.observer.next(new ObservableData(LoadableEvent.FINISHED, language));
    };
    LanguageService.prototype.load = function (value) {
        var locale = value instanceof Language ? value.locale : value;
        if (!locale)
            locale = this.cookies.get('language');
        if (!locale || !this._availableLanguages.has(locale))
            locale = this.defaultLanguage.locale;
        var language = this._availableLanguages.get(locale);
        if (!this.language || !this.language.toEqual(language))
            this.loadLanguage(language);
        else
            this.observer.next(new ObservableData(LoadableEvent.COMPLETE, language));
    };
    LanguageService.prototype.translate = function (key, params) {
        return this.translation.instant(key, params);
    };
    LanguageService.prototype.compile = function (text, params) {
        return this.parser.compile(text, params);
    };
    LanguageService.prototype.hasTranslation = function (key, params) {
        return this.translation.instant(key, params) != key;
    };
    LanguageService.prototype.initialize = function (url, availableLanguages, defaultLanguage) {
        var _this = this;
        if (this.isInitialized)
            throw new Error('Service already initialized');
        if (!url)
            throw new Error('Unable to initialize: url is undefined or empty');
        if (!availableLanguages || availableLanguages.size == 0)
            throw new Error('Unable to initialize: available languages is undefined or empty');
        if (!availableLanguages.has(defaultLanguage))
            throw new Error("Unable to initialize: default language is undefined or doesn't contain in available languages");
        this.isInitialized = true;
        this.url = url;
        availableLanguages.forEach(function (name, locale) { return _this._availableLanguages.add(new Language(locale, name)); });
        this.defaultLanguage = this._availableLanguages.get(defaultLanguage);
    };
    LanguageService.prototype.getLanguageUrl = function (language) {
        return this.url + language.locale + '.json';
    };
    LanguageService.prototype.getCustomLanguageUrl = function (language) {
        return this.url + language.locale + 'Custom.json';
    };
    LanguageService.prototype.getRawTranslationData = function () {
        return this._rawTranslationData;
    };
    Object.defineProperty(LanguageService.prototype, "locale", {
        get: function () {
            return this.language ? this.language.locale : this.defaultLocale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LanguageService.prototype, "defaultLocale", {
        get: function () {
            return this.defaultLanguage ? this.defaultLanguage.locale : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LanguageService.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LanguageService.prototype, "availableLanguages", {
        get: function () {
            return this._availableLanguages;
        },
        enumerable: true,
        configurable: true
    });
    LanguageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CookieService, TranslateService])
    ], LanguageService);
    return LanguageService;
}(Loadable));
export { LanguageService };
export var LanguageServiceEvent;
(function (LanguageServiceEvent) {
    LanguageServiceEvent["PARSE_ERROR"] = "PARSE_ERROR";
})(LanguageServiceEvent || (LanguageServiceEvent = {}));
//# sourceMappingURL=../../../src/language/service/LanguageService.js.map