import { createReducer, on, Action } from '@ngrx/store';
import * as commonActions from './common.actions';
import { CommonState } from './common.state';

export const initialAuthState: CommonState = {
    isLoadingPage: false,
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
);

export function CommonReducers(
    state: CommonState | undefined,
    action: Action
) {
    return _commonReducer(state, action);
}
