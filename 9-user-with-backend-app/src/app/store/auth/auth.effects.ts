import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { login, loginError, loginSuccess } from './auth.actions';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable()
export class authEffects {
  login$;
  loginSuccess$;
  loginError$;

  constructor(
    private service: AuthService,
    private actions$: Actions,
    private router: Router
  ) {
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(login),
        exhaustMap((action) =>
          this.service
            .loginUser({ username: action.username, password: action.password })
            .pipe(
              map((response) => {
                const token = response.token;
                const payload = this.service.getpayload(token);

                const loginData = {
                  user: { username: payload.username },
                  isAuth: true,
                  isAdmin: payload.isAdmin,
                };
                this.service.user = loginData;
                this.service.token = token;
                return loginSuccess({ login: loginData });
              }),
              catchError((error) => of(loginError({error: error.error.message})))
            )
        )
      )
    );

    this.loginSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(loginSuccess),
          tap(() => {
            this.router.navigate(['/users']);
          })
        ),
      { dispatch: false }
    );

    this.loginError$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginError),
        tap((action) => {
          Swal.fire({
            title: 'Login Failed',
            text: action.error,
            icon: 'error',
          });
        })
      ), { dispatch: false }
    );
  }
}
