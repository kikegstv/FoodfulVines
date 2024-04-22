import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const getProductFeatureState: MemoizedSelector<object, ProductState> = createFeatureSelector<ProductState>('product');

export const selectLoadingPage = createSelector(
  getProductFeatureState,
  (state: ProductState) => state?.isLoadingPage
);

export const selectTodos = createSelector(
  getProductFeatureState,
  (state: ProductState) => state?.productData
);
