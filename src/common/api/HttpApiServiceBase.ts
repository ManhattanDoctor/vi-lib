import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/internal/operators';
import { ApiError } from './ApiError';
import { ApiMethod } from './ApiMethod';
import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
import { ApiServiceBase } from './ApiServiceBase';

export abstract class HttpApiServiceBase extends ApiServiceBase {
    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(protected http: HttpClient) {
        super();
        this.idleTimeout = 2 * ApiServiceBase.IDLE_TIMEOUT;
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected makeRequest(url: string, method: ApiMethod, params: HttpParams, headers: HttpHeaders, idleTimeout: number, responseType: any): Observable<any> {
        let observable: Observable<any> = null;
        if (method == 'get') observable = this.http.get(url, { headers: headers, params: params, responseType: responseType });
        else if (method == 'post') observable = this.http.post(url, params, { headers: headers, responseType: responseType });
        else if (method == 'put') observable = this.http.put(url, params, { headers: headers, responseType: responseType });
        else if (method == 'delete') observable = this.http.delete(url, { headers: headers, responseType: responseType });

        if (!observable) throw new Error('Unable to make request: method is undefined');
        return observable.pipe(timeout(idleTimeout));
    }

    protected createHeadersForRequest(request: ApiRequest, method: ApiMethod, body: HttpParams): HttpHeaders {
        return new HttpHeaders();
    }

    protected parseResponse(data: any, request: ApiRequest): ApiResponse {
        return new ApiResponse(data, request);
    }

    protected parseErrorResponse(error: HttpErrorResponse, request: ApiRequest): ApiResponse {
        return this.parseResponse(ApiError.createSystemError(error), request);
    }
}
