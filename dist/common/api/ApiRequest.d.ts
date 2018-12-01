import { IDestroyable } from '../IDestroyable';
import { ApiMethod } from './ApiMethod';
import { IApiRequestConfig } from './IApiRequestConfig';
export declare class ApiRequest implements IDestroyable {
    private _config;
    constructor(param: IApiRequestConfig);
    getConfig(): IApiRequestConfig;
    toString(): string;
    destroy(): void;
    readonly isHandleLoading: boolean;
    readonly isHandleError: boolean;
    readonly data: any;
    readonly name: string;
    readonly idleTimeout: number;
    readonly responseType: string;
    readonly method: ApiMethod;
}
