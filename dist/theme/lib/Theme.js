var Theme = (function () {
    function Theme() {
        this.styles = {};
    }
    Theme.prototype.getStyle = function (name) {
        return this.styles ? this.styles[name] : null;
    };
    Theme.prototype.update = function (data) {
        if (data.hasOwnProperty('name')) {
            this.name = data.name;
            if (!this.styleName)
                this.styleName = this.name + '-theme';
        }
        if (data.hasOwnProperty('styles'))
            this.styles = data.styles;
        if (data.hasOwnProperty('isDark'))
            this.isDark = data.isDark;
        if (data.hasOwnProperty('styleName'))
            this.styleName = data.name;
    };
    Object.defineProperty(Theme.prototype, "id", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return Theme;
}());
export { Theme };
//# sourceMappingURL=../../../src/theme/lib/Theme.js.map