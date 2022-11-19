import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Subject} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        protected router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve, _) => {
            const resolved$ = new Subject();
            resolved$.next(true);
            resolved$.complete();
            resolve(true);
            
            let user = this.authService.isLogged();

            if(!user){
                this.router.navigate(['login']);
                resolve(false);
            }
            resolve(true);
        });


    }
}
