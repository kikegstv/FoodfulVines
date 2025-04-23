import { createAction, props } from '@ngrx/store';

export const startLoading = createAction('[Common] Start Loading');
export const stopLoading = createAction('[Common] Stop Loading');

// Modal actions
export const openModal = createAction(
  '[Common] Open Modal',
  props<{ modalId: string; data?: any }>()
);

export const closeModal = createAction(
  '[Common] Close Modal',
  props<{ modalId: string }>()
);

export const closeAllModals = createAction('[Common] Close All Modals');

