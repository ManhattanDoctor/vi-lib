import { Observable } from 'rxjs';
import { ApiMethod } from '../api/ApiMethod';
import { ApiResponse } from '../api/ApiResponse';
import { ApiServiceBase } from '../api/ApiServiceBase';
import { IDestroyable } from '../IDestroyable';
import { LoadableMapCollection } from './LoadableMapCollection';
export declare abstract class ApiBaseLoadableMapCollection<U extends IDestroyable> extends LoadableMapCollection<U> {
    protected api: ApiServiceBase;
    protected requestName: string;
    protected requestMethod: ApiMethod;
    constructor(api: ApiServiceBase, requestName?: string, requestMethod?: ApiMethod, uid?: string);
    protected sort(): void;
    protected createParamsForRequest(): any;
    protected parseErrorResponse(response: ApiResponse): void;
    protected makeRequest(): Observable<ApiResponse>;
    protected parseResponse(response: ApiResponse): void;
    destroy(): void;
}
