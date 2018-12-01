var MenuItem = (function () {
    function MenuItem(nameId, sortIndex, flag, iconId) {
        this.enabled = true;
        this.nameId = nameId;
        this.sortIndex = sortIndex;
        this.flag = flag || 'none';
        this.iconId = iconId;
    }
    return MenuItem;
}());
export { MenuItem };
//# sourceMappingURL=../../../../src/common/component/menu/MenuItem.js.map