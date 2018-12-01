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
import { ResizeableWindow } from './ResizeableWindow';
var DragableWindow = (function (_super) {
    __extends(DragableWindow, _super);
    function DragableWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isWasDragged = false;
        return _this;
    }
    DragableWindow.prototype.setProperties = function () {
        _super.prototype.setProperties.call(this);
        if (this.config.isModal)
            return;
        ViewUtil.addClass(this.container, 'draggable');
        if (!this.config.isContentDragable)
            return;
        this.dragMoveHandlerProxy = this.dragMoveHandler.bind(this);
        this.dragStartHandlerProxy = this.dragStartHandler.bind(this);
        var param = {};
        this.interactable.draggable(param);
        this.interactable.on('dragmove', this.dragMoveHandlerProxy);
        this.interactable.on('dragstart', this.dragStartHandlerProxy);
    };
    DragableWindow.prototype.isNeedClickStopPropagation = function (event) {
        return this.isWasDragged || _super.prototype.isNeedClickStopPropagation.call(this, event);
    };
    DragableWindow.prototype.dragStartHandler = function (event) {
        this.isWasDragged = true;
    };
    DragableWindow.prototype.dragMoveHandler = function (event) {
        var x = this.getX() + event.dx;
        var y = this.getY() + event.dy;
        this.move(x, y);
    };
    DragableWindow.prototype.mouseClickHandler = function (event) {
        _super.prototype.mouseClickHandler.call(this, event);
        this.isWasDragged = false;
    };
    DragableWindow.prototype.destroy = function () {
        this.dragMoveHandlerProxy = null;
        this.dragStartHandlerProxy = null;
        _super.prototype.destroy.call(this);
    };
    return DragableWindow;
}(ResizeableWindow));
export { DragableWindow };
//# sourceMappingURL=../../../../src/window/lib/window/DragableWindow.js.map