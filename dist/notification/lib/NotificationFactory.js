var NotificationFactory = (function () {
    function NotificationFactory(classType) {
        this.classType = classType;
    }
    NotificationFactory.prototype.create = function (reference, config, overlay) {
        return new this.classType(reference, config, overlay);
    };
    return NotificationFactory;
}());
export { NotificationFactory };
//# sourceMappingURL=../../../src/notification/lib/NotificationFactory.js.map