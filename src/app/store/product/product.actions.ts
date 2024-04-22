import { createAction, props } from '@ngrx/store';
import { Product } from '../../features/products/models/products.model';

export const getProducts = createAction('[Todo Page] GetProducts');
export const successGetProducts = createAction('[Todo API] SuccessGetProducts', props<{ productData: Product[] }>());
export const failureGetProducts = createAction('[Todo API] FailureGetProducts', props<{ error: any }>());

export const createProducts = createAction('[Todo Page] createProducts', props<{ product: Product, file: File }>());
export const successCreateProducts = createAction('[Todo API] SuccessCreateProducts');
export const failureCreateProducts = createAction('[Todo API] FailureCreateProducts', props<{ error: any }>());

export const updateProducts = createAction('[Todo Page] updateProducts', props<{ product: Product }>());
export const successUpdateProducts = createAction('[Todo API] SuccessUpdateProducts');
export const failureUpdateProducts = createAction('[Todo API] FailureUpdateProducts', props<{ error: any }>());

export const deleteProducts = createAction('[Todo Page] deleteProducts', props<{ productId: string }>());
export const successDeleteProducts = createAction('[Todo API] SuccessDeleteProducts');
export const failureDeleteProducts = createAction('[Todo API] FailureDeleteProducts', props<{ error: any }>());
