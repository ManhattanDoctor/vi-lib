import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../IUser';
import { ObservableData } from '../observer/ObservableData';
import { LoginBaseService, LoginBaseServiceEvent } from './LoginBaseService';

@Injectable()
export abstract class UserBaseService<U, V extends IUser> {
    //--------------------------------------------------------------------------
    //
    //	Properties
    //
    //--------------------------------------------------------------------------

    protected _user: V;
    protected observer: Subject<ObservableData<U | UserBaseServiceEvent, V>>;

    //--------------------------------------------------------------------------
    //
    //	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(protected login: LoginBaseService<any>) {
        this.observer = new Subject();
    }

    //--------------------------------------------------------------------------
    //
    //	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        if (this.login.isLoggedIn) {
            this._user = this.createUser(this.login.loginData);
            this.observer.next(new ObservableData(UserBaseServiceEvent.LOGINED, this.user));
        }

        this.login.events.subscribe(data => {
            if (data.type == LoginBaseServiceEvent.LOGIN_COMPLETE) {
                this._user = this.createUser(this.login.loginData);
                this.observer.next(new ObservableData(UserBaseServiceEvent.LOGINED, this.user));
            } else if (data.type == LoginBaseServiceEvent.LOGOUT_FINISHED) {
                this._user = null;
                this.observer.next(new ObservableData(UserBaseServiceEvent.LOGOUTED));
            }
        });
    }

    protected abstract createUser(data: any): V;

    //--------------------------------------------------------------------------
    //
    //	Public Methods
    //
    //--------------------------------------------------------------------------

    public isUser(value: any): boolean {
        if (!value || !this.user) return false;

        if (value.hasOwnProperty('id')) return this.user.id == value.id;

        return this.user.id == value;
    }

    public updateUser(data: any): void {
        this.user.update(data);
        this.observer.next(new ObservableData(UserBaseServiceEvent.CHANGED));
    }

    //--------------------------------------------------------------------------
    //
    //	Public Properties
    //
    //--------------------------------------------------------------------------

    public get events(): Observable<ObservableData<U | UserBaseServiceEvent, V>> {
        return this.observer.asObservable();
    }

    public get hasUser(): boolean {
        return this._user != null;
    }

    public get isLogined(): boolean {
        return this.hasUser;
    }

    public get user(): V {
        return this._user;
    }

    public get id(): string {
        return this.hasUser ? this.user.id : null;
    }
}

export enum UserBaseServiceEvent {
    LOGINED = 'LOGINED',
    CHANGED = 'CHANGED',
    LOGOUTED = 'LOGOUTED'
}
