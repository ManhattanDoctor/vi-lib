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
import { ViewUtil } from '../../../util/ViewUtil';
import { DestroyableComponent } from '../../DestroyableComponent';
var WindowElement = (function (_super) {
    __extends(WindowElement, _super);
    function WindowElement(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        return _this;
    }
    WindowElement.prototype.checkWindowParent = function () {
        var container = this.element.nativeElement;
        while (container && container.nodeName.toLowerCase() != 'mat-dialog-container')
            container = container.parentElement;
        if (container)
            ViewUtil.appendChild(container, this.element.nativeElement);
    };
    WindowElement.prototype.createChildren = function () { };
    WindowElement.prototype.destroyChildren = function () { };
    WindowElement.prototype.commitWindowProperties = function () { };
    WindowElement.prototype.ngAfterViewInit = function () {
        this.createChildren();
        this.checkWindowParent();
    };
    WindowElement.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.destroyChildren();
        this.element = null;
        this.window = null;
    };
    Object.defineProperty(WindowElement.prototype, "nativeElement", {
        get: function () {
            return this.element ? this.element.nativeElement : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowElement.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (value) {
            if (value == this._window)
                return;
            this._window = value;
            if (this.window)
                this.commitWindowProperties();
        },
        enumerable: true,
        configurable: true
    });
    return WindowElement;
}(DestroyableComponent));
export { WindowElement };
//# sourceMappingURL=../../../../../src/common/component/window/element/WindowElement.js.map