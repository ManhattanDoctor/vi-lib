import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ObservableData } from '../observer/ObservableData';
import { ApiMethod } from './ApiMethod';
import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
import { IApiRequestConfig } from './IApiRequestConfig';

export abstract class ApiServiceBase {
    // --------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    // --------------------------------------------------------------------------

    public static IDLE_TIMEOUT = 30000;

    // --------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    // --------------------------------------------------------------------------

    public sid: string;

    protected _isLoading: boolean;

    protected idleTimeout: number = ApiServiceBase.IDLE_TIMEOUT;
    protected responseType: string = 'json';
    protected defaultMethod: ApiMethod = 'post';
    protected observer: Subject<ObservableData<ApiServiceBaseEvent, ApiRequest | ApiResponse<any>>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        this.observer = new Subject();
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected sendRequest(request: ApiRequest, resolve?: any, reject?: any, observer?: any): void {
        this._isLoading = true;
        this.observer.next(new ObservableData(ApiServiceBaseEvent.STARTED, request));

        let subscription = this.sendRequestToServer(request).subscribe(
            response => {
                subscription.unsubscribe();

                let apiResponse = this.parseResponse(response, request);
                this._isLoading = false;
                this.observer.next(new ObservableData(ApiServiceBaseEvent.FINISHED, apiResponse));

                console.log(apiResponse);
                if (observer) {
                    observer.next(apiResponse);
                    observer.complete();
                }

                if (apiResponse.isHasError) {
                    if (reject) reject(apiResponse);
                    this.observer.next(new ObservableData(ApiServiceBaseEvent.ERROR, apiResponse, apiResponse.error));
                } else {
                    if (resolve) resolve(apiResponse);
                    this.observer.next(new ObservableData(ApiServiceBaseEvent.COMPLETE, apiResponse));
                }
            },
            error => {
                subscription.unsubscribe();

                let apiResponse = this.parseErrorResponse(error, request);
                if (reject) {
                    reject(apiResponse);
                }

                this._isLoading = false;
                this.observer.next(new ObservableData(ApiServiceBaseEvent.FINISHED, apiResponse));

                if (observer) {
                    observer.next(apiResponse);
                    observer.complete();
                }

                console.log(apiResponse);
                this.observer.next(new ObservableData(ApiServiceBaseEvent.ERROR, apiResponse, apiResponse.error));
            }
        );
    }

    protected sendRequestToServer(request: ApiRequest): Observable<any> {
        let method: ApiMethod = request.method || this.defaultMethod;

        let url = this.createUrlForRequest(request, method);
        let params = this.createParamsForRequest(request, method);
        let headers = this.createHeadersForRequest(request, method, params);
        let idleTimeout = request.idleTimeout || this.idleTimeout;
        let responseType = request.responseType || this.responseType;
        return this.makeRequest(url, method, params, headers, idleTimeout, responseType);
    }

    protected abstract makeRequest(
        url: string,
        method: ApiMethod,
        params: HttpParams,
        headers: HttpHeaders,
        idleTimeout: number,
        responseType: string
    ): Observable<any>;

    protected convertToParams(params: any): HttpParams {
        let value: HttpParams = new HttpParams();
        if (!params) return;

        Object.keys(params).forEach(key => (value = value.append(key, params[key])));
        return value;
    }

    // --------------------------------------------------------------------------
    //
    // 	Create Methods
    //
    // --------------------------------------------------------------------------

    protected abstract createUrlForRequest(request: ApiRequest, method: ApiMethod): string;

    protected abstract createParamsForRequest(request: ApiRequest, method: ApiMethod): HttpParams;

    protected abstract createHeadersForRequest(request: ApiRequest, method: ApiMethod, body: HttpParams): HttpHeaders;

    // --------------------------------------------------------------------------
    //
    // 	Parse Methods
    //
    // --------------------------------------------------------------------------

    protected abstract parseResponse<T>(data: any, request: ApiRequest): ApiResponse<T>;

    protected abstract parseErrorResponse<T>(error: HttpErrorResponse, request: ApiRequest): ApiResponse<T>;

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async send<T>(param: IApiRequestConfig): Promise<ApiResponse<T>> {
        if (param.isHandleLoading === null || param.isHandleLoading === undefined) param.isHandleLoading = false;
        if (param.isHandleError === null || param.isHandleError === undefined) param.isHandleError = true;

        let request = new ApiRequest(param);
        return new Promise<ApiResponse<T>>((resolve, reject) => {
            this.sendRequest(request, resolve, reject);
        });
    }

    public call<T>(param: IApiRequestConfig): Observable<ApiResponse<T>> {
        if (param.isHandleLoading === null || param.isHandleLoading === undefined) param.isHandleLoading = false;
        if (param.isHandleError === null || param.isHandleError === undefined) param.isHandleError = true;

        let request = new ApiRequest(param);
        return new Observable(observer => {
            this.sendRequest(request, null, null, observer);
        });
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get events(): Observable<ObservableData<ApiServiceBaseEvent, ApiRequest | ApiResponse<any>>> {
        return this.observer.asObservable();
    }
}

export enum ApiServiceBaseEvent {
    ERROR = 'ERROR',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
    COMPLETE = 'COMPLETE'
}
