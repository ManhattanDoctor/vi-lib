import { Injectable } from '@angular/core';
import { Loadable, LoadableStatus } from '../lib/Loadable';

@Injectable()
export class SocketBaseService<U, V> extends Loadable<U, V> {
    //--------------------------------------------------------------------------
    //
    //	Private Properties
    //
    //--------------------------------------------------------------------------

    protected _socket: WebSocket;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        super();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public connect(url: string): void {
        this.status = LoadableStatus.NOT_LOADED;
        this.socket = new WebSocket(url);
    }

    public send(data: any): void {
        if (!this.isLoaded) throw new Error('Socket must be opened first');

        console.log(data);
        this.socket.send(data);
    }

    public disconnect(): void {
        this.socket = null;
        this.status = LoadableStatus.NOT_LOADED;
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Event Handlers
    //
    //--------------------------------------------------------------------------

    protected errorHandler(event: Event): void {}
    protected openedHandler(event: Event): void {}
    protected closedHandler(event: CloseEvent): void {}
    protected messageHandler(event: MessageEvent): void {}

    //--------------------------------------------------------------------------
    //
    //	Event Handlers
    //
    //--------------------------------------------------------------------------

    private socketOpenedHandler = (event: Event): void => {
        this.status = LoadableStatus.LOADED;
        this.openedHandler(event);
    };

    private socketErrorHandler = (event: Event): void => {
        this.status = LoadableStatus.ERROR;
        this.errorHandler(event);
    };

    private socketClosedHandler = (event: CloseEvent): void => {
        this.status = LoadableStatus.NOT_LOADED;
        this.closedHandler(event);
    };

    private socketMessageHandler = (event: MessageEvent): void => {
        this.messageHandler(event);
    };

    //--------------------------------------------------------------------------
    //
    //	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get socket(): WebSocket {
        return this._socket;
    }
    protected set socket(value: WebSocket) {
        if (value == this._socket) return;

        if (this._socket) {
            this._socket.removeEventListener('open', this.socketOpenedHandler);
            this._socket.removeEventListener('error', this.socketErrorHandler);
            this._socket.removeEventListener('close', this.socketClosedHandler);
            this._socket.removeEventListener('message', this.socketMessageHandler);

            if (this._socket.readyState == WebSocket.OPEN || this._socket.readyState == WebSocket.CONNECTING) this._socket.close();
        }

        this._socket = value;

        if (this._socket) {
            this._socket.addEventListener('open', this.socketOpenedHandler);
            this._socket.addEventListener('error', this.socketErrorHandler);
            this._socket.addEventListener('close', this.socketClosedHandler);
            this._socket.addEventListener('message', this.socketMessageHandler);
        }
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        super.destroy();
        this.disconnect();
    }

    public get url(): string {
        return this.socket ? this.socket.url : null;
    }
}
