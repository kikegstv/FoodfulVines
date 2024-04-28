import { createAction, props } from '@ngrx/store';
import { Product } from '../../features/products/models/products.model';

export const getProducts = createAction('[Product Page] GetProducts');
export const successGetProducts = createAction('[Product API] SuccessGetProducts', props<{ productData: Product[] }>());
export const failureGetProducts = createAction('[Product API] FailureGetProducts', props<{ error: any }>());

export const createProducts = createAction('[Product Page] createProducts', props<{ product: Product, file: File }>());
export const successCreateProducts = createAction('[Product API] SuccessCreateProducts');
export const failureCreateProducts = createAction('[Product API] FailureCreateProducts', props<{ error: any }>());

export const updateProducts = createAction('[Product Page] updateProducts', props<{ product: Product }>());
export const successUpdateProducts = createAction('[Product API] SuccessUpdateProducts');
export const failureUpdateProducts = createAction('[Product API] FailureUpdateProducts', props<{ error: any }>());

export const deleteProducts = createAction('[Product Page] deleteProducts', props<{ productId: string }>());
export const successDeleteProducts = createAction('[Product API] SuccessDeleteProducts');
export const failureDeleteProducts = createAction('[Product API] FailureDeleteProducts', props<{ error: any }>());
