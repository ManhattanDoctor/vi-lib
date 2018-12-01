import { InteractEvent } from 'interactjs';
import { Window } from '../Window';
export declare class ResizeableWindow extends Window {
    private _interactable;
    private resizeMoveHandlerProxy;
    protected setProperties(): void;
    resizeMoveHandler(event: InteractEvent): void;
    destroy(): void;
    protected readonly interactable: any;
}
