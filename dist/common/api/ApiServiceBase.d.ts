import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ObservableData } from '../observer/ObservableData';
import { ApiMethod } from './ApiMethod';
import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
import { IApiRequestConfig } from './IApiRequestConfig';
export declare abstract class ApiServiceBase {
    static IDLE_TIMEOUT: number;
    sid: string;
    protected _isLoading: boolean;
    protected idleTimeout: number;
    protected responseType: string;
    protected defaultMethod: ApiMethod;
    protected observer: Subject<ObservableData<ApiServiceBaseEvent, ApiRequest | ApiResponse>>;
    constructor();
    protected sendRequest(request: ApiRequest, resolve?: any, reject?: any, observer?: any): void;
    protected sendRequestToServer(request: ApiRequest): Observable<any>;
    protected abstract makeRequest(url: string, method: ApiMethod, params: HttpParams, headers: HttpHeaders, idleTimeout: number, responseType: string): Observable<any>;
    protected convertToParams(params: any): HttpParams;
    protected abstract createUrlForRequest(request: ApiRequest, method: ApiMethod): string;
    protected abstract createParamsForRequest(request: ApiRequest, method: ApiMethod): HttpParams;
    protected abstract createHeadersForRequest(request: ApiRequest, method: ApiMethod, body: HttpParams): HttpHeaders;
    protected abstract parseResponse(data: any, request: ApiRequest): ApiResponse;
    protected abstract parseErrorResponse(error: HttpErrorResponse, request: ApiRequest): ApiResponse;
    send(param: IApiRequestConfig): Promise<ApiResponse>;
    call(param: IApiRequestConfig): Observable<ApiResponse>;
    readonly isLoading: boolean;
    readonly events: Observable<ObservableData<ApiServiceBaseEvent, ApiRequest | ApiResponse>>;
}
export declare enum ApiServiceBaseEvent {
    ERROR = "ERROR",
    STARTED = "STARTED",
    FINISHED = "FINISHED",
    COMPLETE = "COMPLETE"
}
