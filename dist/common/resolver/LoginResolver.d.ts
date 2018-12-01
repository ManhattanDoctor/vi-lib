import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginBaseService } from '../service/LoginBaseService';
import { LoginRequireResolver } from './LoginRequireResolver';
export declare class LoginResolver extends LoginRequireResolver {
    static redirectUrl: string;
    static logoutUrl: string;
    constructor(login: LoginBaseService<any>);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void>;
}
