import { IDestroyable } from '../IDestroyable';
import { ApiMethod } from './ApiMethod';
import { IApiRequestConfig } from './IApiRequestConfig';

export class ApiRequest implements IDestroyable {
    //--------------------------------------------------------------------------
    //
    //	Private Properties
    //
    //--------------------------------------------------------------------------

    private _config: IApiRequestConfig;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(param: IApiRequestConfig) {
        this._config = param;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public getConfig(): IApiRequestConfig {
        return this._config;
    }

    public toString(): string {
        return JSON.stringify(this.data);
    }

    public destroy(): void {
        this._config = null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get isHandleLoading(): boolean {
        return this._config.isHandleLoading;
    }

    public get isHandleError(): boolean {
        return this._config.isHandleError;
    }

    public get data(): any {
        return this._config.data;
    }

    public get name(): string {
        return this._config.name;
    }

    public get idleTimeout(): number {
        return this._config.idleTimeout;
    }

    public get responseType(): string {
        return this._config.responseType;
    }

    public get method(): ApiMethod {
        return this._config.method;
    }
}
