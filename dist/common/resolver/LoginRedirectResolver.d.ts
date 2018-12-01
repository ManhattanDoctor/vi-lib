import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
export declare class LoginRedirectResolver implements CanActivate {
    constructor();
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
