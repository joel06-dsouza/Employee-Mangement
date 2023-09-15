import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable({providedIn:  'root'})
export class AuthGuard {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // if(!this.isTokenPresent() || state.url === '/welcome') {
        if(!this.isTokenPresent()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    isTokenPresent(): boolean {
        const token = localStorage.getItem("token");
        return token != null;
    }

}