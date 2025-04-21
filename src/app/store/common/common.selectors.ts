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
    (state: CommonState) => state.isLoadingPage
);

export const selectAllModals = createSelector(
    getCommonFeatureState,
    (state: CommonState) => state.modals
);

export const selectModalState = (modalId: string) => createSelector(
    selectAllModals,
    (modals) => modals[modalId] ? modals[modalId].isOpen : false
);

export const selectModalData = (modalId: string) => createSelector(
    selectAllModals,
    (modals) => modals[modalId] ? modals[modalId].data : undefined
);
