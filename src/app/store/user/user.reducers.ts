import { createReducer, on, Action } from '@ngrx/store';
import * as userActions from './user.actions';
import { UserState } from './user.state';

export const initialAuthState: UserState = {
    userData: null,
};

const _userReducer = createReducer(
    initialAuthState,
    on(userActions.getUser, (state) => {
        return {
            ...state,
        };
    }),
    on(userActions.SuccessGetUser, (state, { userData }) => {
        return {
            ...state,
            userData,
        };
    }),
    on(userActions.failureGetUser, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(userActions.loginUser, (state) => {
        return {
            ...state,
        };
    }),
    on(userActions.loginUserSuccess, (state, { user }) => {
        return {
            ...state,
            userData: user,
        };
    }),
    on(userActions.loginUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),
    on(userActions.createUser, (state) => {
        return {
            ...state,
        };
    }),
    on(userActions.successCreateUser, (state) => {
        return {
            ...state,
        };
    }),
    on(userActions.failureCreateUser, (state, { error }) => {
        return {
            ...state,
            error,
        };
    }),

    on(userActions.logoutUser, (state) => {
        return {
            ...state,
        };
    }),
    on(userActions.logoutUserSuccess, (state) => {
        return {
            ...state,
            userData: null,
        };
    }),
    on(userActions.logoutUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);

export function UserReducers(
    state: UserState | undefined,
    action: Action
) {
    return _userReducer(state, action);
}
