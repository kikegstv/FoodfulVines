import { CommonEffects } from './common/common.effects';
import { CommonReducers } from './common/common.reducers';
import { CommonState } from './common/common.state';
import { ProductEffects } from './product/product.effects';
import { ProductReducers } from './product/product.reducers';
import { ProductState } from './product/product.state';
import { UserEffects } from './user/user.effects';
import { UserReducers } from './user/user.reducers';
import { UserState } from './user/user.state';

export interface RootState {
  product: ProductState;
  user: UserState;
  common: CommonState;
}

export const appReducers = {
  product: ProductReducers,
  user: UserReducers,
  common: CommonReducers,
};

export const appEffects = [
    ProductEffects,
    UserEffects,
    CommonEffects
];
