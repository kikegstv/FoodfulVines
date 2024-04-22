import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as todoActions from './product.actions';
import { ProductsService } from '../../features/products/services/products.service';
import { Product } from '../../features/products/models/products.model';



@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _productService: ProductsService,
  ) {}

  getTodos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(todoActions.getProducts),
      switchMap((_) =>
        this._productService.getProducts().pipe(
          map((productData: Product[]) => {
            return todoActions.successGetProducts({productData});
          }),
          catchError((_) => {
            const error = {message: 'Ha ocurrido un error'};
            return of(todoActions.failureGetProducts({ error }));
          })
        )
      )
    )
  );

  createTodos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(todoActions.createProducts),
      switchMap((payload) =>
        this._productService.createProduct(payload.product, payload.file).pipe(
          map((_) => {
            return todoActions.successCreateProducts();
          }),
          catchError((_) => {
            const error = {message: 'Ha ocurrido un error'};
            return of(todoActions.failureCreateProducts({ error }));
          })
        )
      )
    )
  );

  updateTodos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(todoActions.updateProducts),
      switchMap((payload) =>
        this._productService.updateProduct(payload.product).pipe(
          map((_) => {
            return todoActions.successUpdateProducts();
          }),
          catchError((_) => {
            const error = {message: 'Ha ocurrido un error'};
            return of(todoActions.failureUpdateProducts({ error }));
          })
        )
      )
    )
  );

  deleteTodos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        todoActions.deleteProducts
        ),
      switchMap((payload) =>
        this._productService.deleteProduct(payload.productId).pipe(
          map((_) => {
            return todoActions.successDeleteProducts();
          }),
          catchError((_) => {
            const error = {message: 'Ha ocurrido un error'};
            return of(todoActions.failureDeleteProducts({ error }));
          })
        )
      )
    )
  );

  successTransaction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        todoActions.successDeleteProducts,
        todoActions.successCreateProducts,
        todoActions.successUpdateProducts,
        ),
      switchMap((payload) =>
        this._productService.getProducts().pipe(
          map((_) => {
            return todoActions.getProducts();
          }),
          catchError((_) => {
            const error = {message: 'Ha ocurrido un error'};
            return of(todoActions.failureGetProducts({ error }));
          })
        )
      )
    )
  );
}
