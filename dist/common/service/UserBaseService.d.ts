import { Observable, Subject } from 'rxjs';
import { IUser } from '../IUser';
import { ObservableData } from '../observer/ObservableData';
import { LoginBaseService } from './LoginBaseService';
export declare abstract class UserBaseService<U, V extends IUser> {
    protected login: LoginBaseService<any>;
    protected _user: V;
    protected observer: Subject<ObservableData<U | UserBaseServiceEvent, V>>;
    constructor(login: LoginBaseService<any>);
    protected initialize(): void;
    protected abstract createUser(data: any): V;
    isUser(value: any): boolean;
    updateUser(data: any): void;
    readonly events: Observable<ObservableData<U | UserBaseServiceEvent, V>>;
    readonly hasUser: boolean;
    readonly isLogined: boolean;
    readonly user: V;
    readonly id: string;
}
export declare enum UserBaseServiceEvent {
    LOGINED = "LOGINED",
    CHANGED = "CHANGED",
    LOGOUTED = "LOGOUTED"
}
