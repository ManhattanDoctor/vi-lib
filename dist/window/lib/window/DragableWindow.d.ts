import { InteractEvent } from 'interactjs';
import { ResizeableWindow } from './ResizeableWindow';
export declare class DragableWindow extends ResizeableWindow {
    protected isWasDragged: boolean;
    private dragMoveHandlerProxy;
    private dragStartHandlerProxy;
    protected setProperties(): void;
    protected isNeedClickStopPropagation(event: MouseEvent): boolean;
    dragStartHandler(event: InteractEvent): void;
    dragMoveHandler(event: InteractEvent): void;
    protected mouseClickHandler(event: MouseEvent): void;
    destroy(): void;
}
