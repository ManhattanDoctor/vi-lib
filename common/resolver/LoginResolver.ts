import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginBaseService } from '../service/LoginBaseService';
import { LoginRequireResolver } from './LoginRequireResolver';

@Injectable()
export class LoginResolver extends LoginRequireResolver {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public static redirectUrl: string = '/';
    public static logoutUrl: string = '/login';

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(login: LoginBaseService<any>) {
        super(login);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return super.resolve(route, state);
    }
}
