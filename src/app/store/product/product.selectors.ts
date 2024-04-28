import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const getProductFeatureState: MemoizedSelector<object, ProductState> = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(
  getProductFeatureState,
  (state: ProductState) => state?.productData
);
