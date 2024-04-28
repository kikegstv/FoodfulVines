import { createReducer, on, Action } from '@ngrx/store';
import * as productActions from './product.actions';
import { ProductState } from './product.state';

export const initialAuthState: ProductState = {
  productData: null,
};

const _productReducer = createReducer(
  initialAuthState,
  on(productActions.getProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.successGetProducts, (state, { productData }) => {
    return {
      ...state,
      productData,
    };
  }),
  on(productActions.failureGetProducts, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(productActions.createProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.successCreateProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.failureCreateProducts, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(productActions.updateProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.successUpdateProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.failureUpdateProducts, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(productActions.deleteProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.successDeleteProducts, (state) => {
    return {
      ...state,
    };
  }),
  on(productActions.failureDeleteProducts, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

);

export function ProductReducers(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
