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
import { ViewUtil } from '../../../common/util/ViewUtil';
import { Window } from '../Window';
var ResizeableWindow = (function (_super) {
    __extends(ResizeableWindow, _super);
    function ResizeableWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResizeableWindow.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
        if (!this.config.isResizeable)
            return;
        ViewUtil.addClass(this.container, 'resizeable');
        this.resizeMoveHandlerProxy = this.resizeMoveHandler.bind(this);
        var edges = {};
        edges.top = true;
        edges.left = true;
        edges.right = true;
        edges.bottom = true;
        var param = {};
        param.edges = edges;
        this.interactable.resizable(param);
        this.interactable.on('resizemove', this.resizeMoveHandlerProxy);
    };
    ResizeableWindow.prototype.resizeMoveHandler = function (event) {
        if (!this.isMinimized && (event.dx != 0 || event.dy != 0))
            this.setSize(event.dx + this.getWidth(), event.dy + this.getHeight());
    };
    ResizeableWindow.prototype.destroy = function () {
        if (this._interactable) {
            interact(this.container).unset();
            this._interactable = null;
        }
        this.resizeMoveHandlerProxy = null;
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(ResizeableWindow.prototype, "interactable", {
        get: function () {
            if (!this._interactable) {
                this._interactable = interact(this.container);
                this._interactable.styleCursor(false);
            }
            return this._interactable;
        },
        enumerable: true,
        configurable: true
    });
    return ResizeableWindow;
}(Window));
export { ResizeableWindow };
//# sourceMappingURL=../../../../src/window/lib/window/ResizeableWindow.js.map