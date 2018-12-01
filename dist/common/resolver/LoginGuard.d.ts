import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LoginBaseService } from '../service/LoginBaseService';
export declare class LoginGuard implements CanActivate {
    private login;
    constructor(login: LoginBaseService<any>);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
