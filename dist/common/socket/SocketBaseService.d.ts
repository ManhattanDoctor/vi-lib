import { Loadable } from '../lib/Loadable';
export declare class SocketBaseService<U, V> extends Loadable<U, V> {
    protected _socket: WebSocket;
    constructor();
    connect(url: string): void;
    send(data: any): void;
    disconnect(): void;
    protected errorHandler(event: Event): void;
    protected openedHandler(event: Event): void;
    protected closedHandler(event: CloseEvent): void;
    protected messageHandler(event: MessageEvent): void;
    private socketOpenedHandler;
    private socketErrorHandler;
    private socketClosedHandler;
    private socketMessageHandler;
    protected socket: WebSocket;
    destroy(): void;
    readonly url: string;
}
