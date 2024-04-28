import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store';
import { CommonState } from './common.state';

export const getCommonFeatureState: MemoizedSelector<object, CommonState> =
    createFeatureSelector<CommonState>('common');

export const selectLoadingPage = createSelector(
    getCommonFeatureState,
    (state: CommonState) => state?.isLoadingPage
);
