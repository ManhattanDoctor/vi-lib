var IWindow = (function () {
    function IWindow() {
        this.isOnTop = false;
        this.isMinimized = false;
    }
    IWindow.EVENT_OPENED = 'OPENED';
    IWindow.EVENT_CLOSED = 'CLOSED';
    IWindow.EVENT_CONTENT_READY = 'EVENT_CONTENT_READY';
    IWindow.EVENT_MOVED = 'EVENT_MOVED';
    IWindow.EVENT_RESIZED = 'EVENT_RESIZED';
    IWindow.EVENT_MINIMIZED_CHANGED = 'EVENT_MINIMIZED_CHANGED';
    IWindow.EVENT_SET_ON_TOP = 'EVENT_SET_ON_TOP';
    return IWindow;
}());
export { IWindow };
//# sourceMappingURL=../../../src/window/lib/IWindow.js.map