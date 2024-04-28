import { createAction, props } from '@ngrx/store';
import { User } from '../../features/auth/models/user.model';

export const getUser = createAction('[User Page] GetUser', props<{ uid: string }>());
export const SuccessGetUser = createAction('[User API] SuccessGetUser', props<{ userData: User }>());
export const failureGetUser = createAction('[User API] FailureGetUser', props<{ error: any }>());

export const loginUser = createAction('[User Page] LoginUser', props<{ email: string, password: string }>());
export const loginUserSuccess = createAction('[User API] LoginUser Success', props<{ user: User }>());
export const loginUserFailure = createAction('[User API] LoginUser Failure', props<{ error: any }>());

export const createUser = createAction('[User Page] createUser', props<{ user: User }>());
export const successCreateUser = createAction('[User API] SuccessCreateUser', props<{ user: any }>());
export const failureCreateUser = createAction('[User API] FailureCreateUser', props<{ error: any }>());

export const logoutUser = createAction('[User] Logout');
export const logoutUserSuccess = createAction('[User] Logout Success');
export const logoutUserFailure = createAction('[User] Logout Failure', props<{ error: any }>());
