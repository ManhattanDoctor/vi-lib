import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ObservableData } from '../observer/ObservableData';
export declare abstract class LoginBaseService<U> {
    protected _sid: string;
    protected _resource: string;
    protected _loginData: any;
    protected _isLoading: boolean;
    protected _isLoggedIn: boolean;
    protected observer: Subject<ObservableData<U | LoginBaseServiceEvent, ApiResponse>>;
    constructor();
    protected loginByParam(param?: any): void;
    protected loginBySid(isNeedHandleError?: boolean, isHandleLoading?: boolean): void;
    protected reset(): void;
    protected abstract makeLoginSidRequest(isNeedHandleError: boolean, isHandleLoading: boolean): Observable<ApiResponse>;
    protected abstract makeLoginParamRequest(param: any): Observable<ApiResponse>;
    protected abstract makeLogoutRequest(): Observable<ApiResponse>;
    protected abstract getSavedSid(): string;
    protected abstract parseLoginParamResponse(response: ApiResponse): void;
    protected parseLoginParamErrorResponse(response: ApiResponse): void;
    protected parseLoginSidResponse(response: ApiResponse): void;
    protected parseLoginSidErrorResponse(response: ApiResponse): void;
    tryLoginBySid(isNeedHandleError?: boolean, isHandleLoading?: boolean): boolean;
    logout(): void;
    isCanLoginWithSid(): boolean;
    readonly events: Observable<ObservableData<U | LoginBaseServiceEvent, ApiResponse>>;
    readonly sid: string;
    readonly resource: string;
    readonly loginData: any;
    readonly isLoading: boolean;
    readonly isLoggedIn: boolean;
}
export declare enum LoginBaseServiceEvent {
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGIN_STARTED = "LOGIN_STARTED",
    LOGIN_COMPLETE = "LOGIN_COMPLETE",
    LOGIN_FINISHED = "LOGIN_FINISHED",
    LOGOUT_STARTED = "LOGOUT_STARTED",
    LOGOUT_FINISHED = "LOGOUT_FINISHED"
}
