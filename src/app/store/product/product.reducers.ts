import { createReducer, on, Action } from '@ngrx/store';
import * as todoActions from './product.actions';
import { ProductState } from './product.state';

export const initialAuthState: ProductState = {
  productData: null,
  isLoadingPage: false,
};

const _productReducer = createReducer(
  initialAuthState,
  on(todoActions.getProducts, (state) => {
    return {
      ...state,
      isLoadingPage: true,
    };
  }),
  on(todoActions.successGetProducts, (state, { productData }) => {
    return {
      ...state,
      productData,
      isLoadingPage: false,
    };
  }),
  on(todoActions.failureGetProducts, (state, { error }) => {
    return {
      ...state,
      error,
      isLoadingPage: false,
    };
  }),
  on(todoActions.createProducts, (state) => {
    return {
      ...state,
      isLoadingPage: true,
    };
  }),
  on(todoActions.successCreateProducts, (state) => {
    return {
      ...state,
      isLoadingPage: false,
    };
  }),
  on(todoActions.failureCreateProducts, (state, { error }) => {
    return {
      ...state,
      error,
      isLoadingPage: false,
    };
  }),
  on(todoActions.updateProducts, (state) => {
    return {
      ...state,
      isLoadingPage: true,
    };
  }),
  on(todoActions.successUpdateProducts, (state) => {
    return {
      ...state,
      isLoadingPage: false,
    };
  }),
  on(todoActions.failureUpdateProducts, (state, { error }) => {
    return {
      ...state,
      error,
      isLoadingPage: false,
    };
  }),
  on(todoActions.deleteProducts, (state) => {
    return {
      ...state,
      isLoadingPage: true,
    };
  }),
  on(todoActions.successDeleteProducts, (state) => {
    return {
      ...state,
      isLoadingPage: false,
    };
  }),
  on(todoActions.failureDeleteProducts, (state, { error }) => {
    return {
      ...state,
      error,
      isLoadingPage: false,
    };
  }),

);

export function ProductReducers(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
