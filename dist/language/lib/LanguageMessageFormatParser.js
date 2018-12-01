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
import { TranslateParser } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ObservableData } from '../../common/observer/ObservableData';
import { LanguageServiceEvent } from '../service/LanguageService';
var LanguageMessageFormatParser = (function (_super) {
    __extends(LanguageMessageFormatParser, _super);
    function LanguageMessageFormatParser() {
        var _this = _super.call(this) || this;
        _this.observer = new Subject();
        _this.formatters = new Map();
        _this.translations = new Map();
        return _this;
    }
    LanguageMessageFormatParser.prototype.getKey = function (expression, params) {
        var value = expression;
        if (params)
            value += JSON.stringify(params);
        return value;
    };
    LanguageMessageFormatParser.prototype.getFormatter = function (locale) {
        var value = this.formatters.get(locale);
        if (value)
            return value;
        try {
            value = new MessageFormat(locale);
        }
        catch (error) {
            locale = 'en';
            value = this.formatters.get(locale);
            if (!value)
                value = new MessageFormat(locale);
        }
        return value;
    };
    LanguageMessageFormatParser.prototype.compile = function (text, params) {
        if (!params)
            params = {};
        var value = this.formatter.compile(text)(params);
        this.translations.set(name, value);
        return value;
    };
    LanguageMessageFormatParser.prototype.interpolate = function (expression, params) {
        var key = this.getKey(expression, params);
        var name = this.lastKey;
        var text = this.translations.get(key);
        if (!text && this.formatter) {
            try {
                text = this.compile(expression, params);
            }
            catch (error) {
                text = name;
                var message = "Error parsing '" + name + "':\n\n" + error.message;
                this.observer.next(new ObservableData(LanguageServiceEvent.PARSE_ERROR, new Error(message)));
            }
        }
        return text;
    };
    LanguageMessageFormatParser.prototype.getValue = function (target, key) {
        this.lastKey = key;
        var keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (target && target[key] && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            }
            else if (!keys.length) {
                target = undefined;
            }
            else {
                key += '.';
            }
        } while (keys.length);
        return target;
    };
    Object.defineProperty(LanguageMessageFormatParser.prototype, "events", {
        get: function () {
            return this.observer.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LanguageMessageFormatParser.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            if (value == this._locale)
                return;
            this._locale = value;
            this.translations.clear();
            this.formatter = value ? this.getFormatter(value) : null;
            if (this.formatter)
                this.formatters.set(this.locale, this.formatter);
        },
        enumerable: true,
        configurable: true
    });
    return LanguageMessageFormatParser;
}(TranslateParser));
export { LanguageMessageFormatParser };
//# sourceMappingURL=../../../src/language/lib/LanguageMessageFormatParser.js.map