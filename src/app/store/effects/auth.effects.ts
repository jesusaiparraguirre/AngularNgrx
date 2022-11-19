import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { AuthActionTypes, Login, LoginSuccess, LoginFailure } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {  
 
    @Effect()
    LoginIn: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authService.loginIn(payload).pipe(
          map((user: any) => {
            return new LoginSuccess({user: user.user, password: user.password});
          }),
          catchError((error) => {
            return of(new LoginFailure({error}));
          })
        )
      })
    )
    @Effect({dispatch: false})
    LoginSuccess: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((user:any) => {
        localStorage.setItem('user', user.payload.user);
        this.router.navigate(['tasks']);
      })
    )

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_ERROR),
      tap(() => {
        alert("Usuario incorrecto")
      })
    );

    @Effect({dispatch: false})
    LogOut: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    )



  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {

  }
}