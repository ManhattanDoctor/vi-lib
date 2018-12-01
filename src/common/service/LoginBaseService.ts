import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ObservableData } from '../observer/ObservableData';

export abstract class LoginBaseService<U> {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _sid: string;

    protected _resource: string;
    protected _loginData: any;
    protected _isLoading: boolean = false;
    protected _isLoggedIn: boolean = false;

    protected observer: Subject<ObservableData<U | LoginBaseServiceEvent, ApiResponse>>;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor() {
        this.observer = new Subject();
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected loginByParam(param?: any): void {
        if (this.isLoggedIn || this.isLoading) return;

        this._isLoading = true;
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_STARTED));

        let subscription = this.makeLoginParamRequest(param).subscribe(response => {
            subscription.unsubscribe();
            this._isLoading = false;

            if (!response.isHasError) {
                this.parseLoginParamResponse(response);
                if (this.isCanLoginWithSid()) this.loginBySid();
            } else {
                this.parseLoginParamErrorResponse(response);
                this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_ERROR, response));
                this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_FINISHED, response));
            }
        });
    }

    protected loginBySid(isNeedHandleError: boolean = true, isHandleLoading: boolean = false): void {
        if (!this.sid) this._sid = this.getSavedSid();

        this._isLoading = true;
        let subscription = this.makeLoginSidRequest(isNeedHandleError, isHandleLoading).subscribe(response => {
            subscription.unsubscribe();
            this._isLoading = false;
            this._isLoggedIn = !response.isHasError;

            if (!response.isHasError) {
                this.parseLoginSidResponse(response);
                this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_COMPLETE, response));
            } else {
                this.parseLoginSidErrorResponse(response);
                this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_ERROR, response));
            }
            this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_FINISHED, response));
        });
    }

    protected reset(): void {
        this._sid = null;
        this._resource = null;
    }

    protected abstract makeLoginSidRequest(isNeedHandleError: boolean, isHandleLoading: boolean): Observable<ApiResponse>;

    protected abstract makeLoginParamRequest(param: any): Observable<ApiResponse>;

    protected abstract makeLogoutRequest(): Observable<ApiResponse>;

    protected abstract getSavedSid(): string;

    protected abstract parseLoginParamResponse(response: ApiResponse): void;

    protected parseLoginParamErrorResponse(response: ApiResponse): void {}

    protected parseLoginSidResponse(response: ApiResponse): void {
        this._loginData = response.data;
    }

    protected parseLoginSidErrorResponse(response: ApiResponse): void {
        if (!response.error.isSystem) this.reset();
    }

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public tryLoginBySid(isNeedHandleError: boolean = true, isHandleLoading: boolean = false): boolean {
        if (!this.isCanLoginWithSid()) return false;

        if (!this.isLoggedIn && !this.isLoading) {
            this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGIN_STARTED));
            this.loginBySid(isNeedHandleError, isHandleLoading);
        }
        return true;
    }

    public logout(): void {
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGOUT_STARTED));
        if (this.isLoggedIn) this.makeLogoutRequest();

        this.reset();
        this._isLoggedIn = false;
        this.observer.next(new ObservableData(LoginBaseServiceEvent.LOGOUT_FINISHED));
    }

    public isCanLoginWithSid(): boolean {
        return this.sid != null || this.getSavedSid() != null;
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<ObservableData<U | LoginBaseServiceEvent, ApiResponse>> {
        return this.observer.asObservable();
    }

    public get sid(): string {
        return this._sid;
    }

    public get resource(): string {
        return this._resource;
    }

    public get loginData(): any {
        return this._loginData;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}
export enum LoginBaseServiceEvent {
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGIN_STARTED = 'LOGIN_STARTED',
    LOGIN_COMPLETE = 'LOGIN_COMPLETE',
    LOGIN_FINISHED = 'LOGIN_FINISHED',
    LOGOUT_STARTED = 'LOGOUT_STARTED',
    LOGOUT_FINISHED = 'LOGOUT_FINISHED'
}
