var Language = (function () {
    function Language(locale, name) {
        if (locale === void 0) { locale = ''; }
        if (name === void 0) { name = ''; }
        this._name = name;
        this._locale = locale;
    }
    Language.prototype.toEqual = function (value) {
        if (!value)
            return false;
        if (value instanceof Language)
            return value.locale == this.locale;
        return value == this.locale;
    };
    Object.defineProperty(Language.prototype, "id", {
        get: function () {
            return this._locale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Language.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Language.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Language;
}());
export { Language };
//# sourceMappingURL=../../../src/language/lib/Language.js.map