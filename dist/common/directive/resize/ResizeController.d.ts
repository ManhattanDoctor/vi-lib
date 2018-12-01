import { IDestroyable } from '../../IDestroyable';
export declare class ResizeController implements IDestroyable {
    private element;
    private handler;
    private delay;
    private isForceResize;
    protected sensor: any;
    protected timer: any;
    constructor(element: HTMLElement, handler: Function, delay?: number, isForceResize?: boolean);
    private initialize;
    protected callHandler: () => void;
    protected resizeHandler: () => void;
    destroy(): void;
}
