import { EdgeOptions, InteractEvent, ResizableOptions } from 'interactjs';
import { ViewUtil } from '../../../common/util/ViewUtil';
import { Window } from '../Window';

export class ResizeableWindow extends Window {
    // --------------------------------------------------------------------------
    //
    //  Properties Methods
    //
    // --------------------------------------------------------------------------

    private _interactable: any;
    private resizeMoveHandlerProxy: (...args) => any;

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected setProperties(): void {
        super.setProperties();

        if (!this.config.isResizeable) return;

        ViewUtil.addClass(this.container, 'resizeable');
        this.resizeMoveHandlerProxy = this.resizeMoveHandler.bind(this);

        let edges = {} as EdgeOptions;
        edges.top = true;
        edges.left = true;
        edges.right = true;
        edges.bottom = true;

        let param = {} as ResizableOptions;
        param.edges = edges;

        this.interactable.resizable(param);
        this.interactable.on('resizemove', this.resizeMoveHandlerProxy);
    }

    // --------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    // --------------------------------------------------------------------------

    public resizeMoveHandler(event: InteractEvent): void {
        if (!this.isMinimized && (event.dx !== 0 || event.dy !== 0)) this.setSize(event.dx + this.getWidth(), event.dy + this.getHeight());
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this._interactable) {
            interact(this.container).unset();
            this._interactable = null;
        }

        this.resizeMoveHandlerProxy = null;
        super.destroy();
    }

    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------

    protected get interactable(): any {
        if (!this._interactable) {
            this._interactable = interact(this.container);
            this._interactable.styleCursor(false);
        }
        return this._interactable;
    }
}

declare let interact: any;
