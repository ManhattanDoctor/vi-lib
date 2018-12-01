import { ApiError } from './ApiError';
import { ApiRequest } from './ApiRequest';
export declare class ApiResponse {
    protected _data: any;
    protected _name: string;
    protected _error: ApiError;
    protected _request: ApiRequest;
    constructor(data: any, request?: ApiRequest, language?: string);
    protected parse(data: any, language: string): void;
    protected parseData(data: any, language: string): any;
    protected parseError(data: any, language: string): ApiError;
    protected createError(data: any, language: string): ApiError;
    protected isErrorData(data: any): boolean;
    readonly isHandleError: boolean;
    readonly isHandleLoading: boolean;
    readonly isHasError: boolean;
    readonly error: ApiError;
    readonly request: ApiRequest;
    readonly data: any;
    readonly name: string;
}
