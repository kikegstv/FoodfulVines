import { ProductEffects } from './product/product.effects';
import { ProductReducers } from './product/product.reducers';
import { ProductState } from './product/product.state';

export interface RootState {
  product: ProductState;
}

export const appReducers = {
  product: ProductReducers,
};

export const appEffects = [
    ProductEffects,
];
