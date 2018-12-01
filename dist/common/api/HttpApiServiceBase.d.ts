import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiMethod } from './ApiMethod';
import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
import { ApiServiceBase } from './ApiServiceBase';
export declare abstract class HttpApiServiceBase extends ApiServiceBase {
    protected http: HttpClient;
    constructor(http: HttpClient);
    protected makeRequest(url: string, method: ApiMethod, params: HttpParams, headers: HttpHeaders, idleTimeout: number, responseType: any): Observable<any>;
    protected createHeadersForRequest(request: ApiRequest, method: ApiMethod, body: HttpParams): HttpHeaders;
    protected parseResponse(data: any, request: ApiRequest): ApiResponse;
    protected parseErrorResponse(error: HttpErrorResponse, request: ApiRequest): ApiResponse;
}
