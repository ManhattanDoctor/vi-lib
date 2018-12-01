var Base64Source = (function () {
    function Base64Source(source) {
        if (!source)
            return;
        var index = source.indexOf(Base64Source.PREFIX);
        this.source = index == -1 ? source : source.substr(index + Base64Source.PREFIX.length);
    }
    Object.defineProperty(Base64Source.prototype, "image", {
        get: function () {
            return 'data:image/jpeg;base64,' + this.source.replace(/(\r\n|\n|\r)/gm, '');
        },
        enumerable: true,
        configurable: true
    });
    Base64Source.PREFIX = 'base64,';
    return Base64Source;
}());
export { Base64Source };
//# sourceMappingURL=../../../src/common/lib/Base64Source.js.map