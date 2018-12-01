import { IDestroyable } from '../../IDestroyable';

export class ResizeController implements IDestroyable {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    protected sensor: any;
    protected timer: any;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private element: HTMLElement, private handler: Function, private delay: number = 0, private isForceResize: boolean = false) {
        this.timer = setTimeout(this.initialize);
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    private initialize = () => {
        this.sensor = new ResizeSensor(this.element, this.resizeHandler);

        if (this.isForceResize) this.resizeHandler();
    };

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    protected callHandler = () => {
        this.handler();
    };

    protected resizeHandler = () => {
        if (isNaN(this.delay) || this.delay <= 0) {
            this.callHandler();
            return;
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(this.callHandler, this.delay);
    };

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        if (this.sensor) {
            this.sensor.detach(this.resizeHandler);
            this.sensor = null;
        }

        this.handler = null;
        this.element = null;
    }
}

declare let ResizeSensor: any;
