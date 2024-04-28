import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const getUserFeatureState: MemoizedSelector<object, UserState> = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  getUserFeatureState,
  (state: UserState) => state?.userData
);
