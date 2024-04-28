import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../features/auth/models/user.model';
import * as userActions from './user.actions';
import { Router } from '@angular/router';
import { CommonFacade } from '../../facades/common.facade';

@Injectable()
export class UserEffects {
    constructor(
        private _actions$: Actions,
        private _authService: AuthService,
        private _commonFacade: CommonFacade,
        private router: Router
    ) {}

    getUser$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.getUser),
            switchMap((payload) =>
                this._authService.getUserData(payload.uid).pipe(
                    map((userData: User) => {
                        console.log(userData)
                        return userActions.SuccessGetUser({ userData });
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(userActions.failureGetUser({ error }));
                    })
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.loginUser),
            switchMap((payload) =>
                this._authService.login(payload.email, payload.password).pipe(
                    map((user: User) => {
                        const { accessToken, uid } = user;
                        localStorage.setItem('accessToken', accessToken as string);
                        localStorage.setItem('uid', JSON.stringify(uid));
                        this.router.navigate(['/products']);
                        return userActions.loginUserSuccess({ user: user });
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(userActions.loginUserFailure({ error }));
                    })
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.createUser),
            switchMap((payload) =>
                this._authService.register(payload.user).pipe(
                    map((user) => {
                        console.log(user)
                        return userActions.successCreateUser(user);
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(userActions.failureCreateUser({ error }));
                    })
                )
            )
        )
    );

    onAuthProccess$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(
                    userActions.getUser,
                    userActions.createUser,
                    userActions.loginUser
                ),
                tap((_) => {
                    console.log("Start Loading")
                    this._commonFacade.setLoadingPage();
                })
            ),
        { dispatch: false }
    )

    successAuthProccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                userActions.SuccessGetUser,
                userActions.successCreateUser,
                userActions.loginUserSuccess
            ),
            tap((_) => {
                this._commonFacade.unsetLoadingPage();
            }),
        ),
        { dispatch: false }
    );

    failureAuthProccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                userActions.failureGetUser,
                userActions.failureCreateUser,
                userActions.loginUserFailure
            ),
            tap((_) => {
                this._commonFacade.unsetLoadingPage();
            }),
        ),
        { dispatch: false }
    );
}
