import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoginBaseService } from '../service/LoginBaseService';
export declare class LoginRequireResolver implements Resolve<void> {
    protected login: LoginBaseService<any>;
    constructor(login: LoginBaseService<any>);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void>;
}
