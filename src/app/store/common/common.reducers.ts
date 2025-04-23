import { createReducer, on, Action } from '@ngrx/store';
import * as commonActions from './common.actions';
import { CommonState } from './common.state';

export const initialAuthState: CommonState = {
    isLoadingPage: false,
    modals: {}
};

const _commonReducer = createReducer(
    initialAuthState,
    on(commonActions.startLoading, (state) => {
        return {
            ...state,
            isLoadingPage: true,
        };
    }),
    on(commonActions.stopLoading, (state) => {
        return {
            ...state,
            isLoadingPage: false,
        };
    }),
    on(commonActions.openModal, (state, { modalId, data }) => {
        return {
            ...state,
            modals: {
                ...state.modals,
                [modalId]: {
                    isOpen: true,
                    data: data || undefined
                }
            }
        };
    }),
    on(commonActions.closeModal, (state, { modalId }) => {
        const newModals = { ...state.modals };
        if (newModals[modalId]) {
            newModals[modalId] = {
                ...newModals[modalId],
                isOpen: false
            };
        }
        return {
            ...state,
            modals: newModals
        };
    }),
    on(commonActions.closeAllModals, (state) => {
        const closedModals = Object.keys(state.modals).reduce((acc, modalId) => {
            acc[modalId] = {
                ...state.modals[modalId],
                isOpen: false
            };
            return acc;
        }, {} as CommonState['modals']);

        return {
            ...state,
            modals: closedModals
        };
    })
);

export function CommonReducers(
    state: CommonState | undefined,
    action: Action
) {
    return _commonReducer(state, action);
}
