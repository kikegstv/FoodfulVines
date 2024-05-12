import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductsService } from '../../features/products/services/products.service';
import { Product } from '../../features/products/models/products.model';
import { CommonFacade } from '../../facades/common.facade';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
    constructor(
        private _actions$: Actions,
        private _productService: ProductsService,
        private _commonFacade: CommonFacade,
        private _router: Router
    ) {}

    getTodos$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.getProducts),
            switchMap((_) =>
                this._productService.getProducts().pipe(
                    map((productData: Product[]) => {
                        return ProductActions.successGetProducts({
                            productData,
                        });
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(ProductActions.failureGetProducts({ error }));
                    })
                )
            )
        )
    );

    createTodos$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.createProducts),
            switchMap((payload) =>
                this._productService
                    .createProduct(payload.product, payload.file)
                    .pipe(
                        map((_) => {
                            return ProductActions.successCreateProducts();
                        }),
                        catchError((_) => {
                            const error = { message: 'Ha ocurrido un error' };
                            return of(
                                ProductActions.failureCreateProducts({ error })
                            );
                        })
                    )
            )
        )
    );

    updateTodos$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.updateProducts),
            switchMap((payload) =>
                this._productService.updateProduct(payload.product).pipe(
                    map((_) => {
                        return ProductActions.successUpdateProducts();
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(
                            ProductActions.failureUpdateProducts({ error })
                        );
                    })
                )
            )
        )
    );

    deleteTodos$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.deleteProducts),
            switchMap((payload) =>
                this._productService.deleteProduct(payload.productId).pipe(
                    map((_) => {
                        return ProductActions.successDeleteProducts();
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(
                            ProductActions.failureDeleteProducts({ error })
                        );
                    })
                )
            )
        )
    );

    getProductDetail$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.getProductDetail),
            tap((_) => {
                console.log("Here")
                this._router.navigate(['/products/product-details']);
                console.log("Here end")
            }),
        ),
        { dispatch: false }
    );

    onProductProccess$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(
                    ProductActions.getProducts,
                    ProductActions.createProducts,
                    ProductActions.updateProducts,
                    ProductActions.deleteProducts
                ),
                tap((_) => {
                    console.log("Start Loading")
                    this._commonFacade.setLoadingPage();
                })
            ),
        { dispatch: false }
    )

    //successGetProducts
    successGetProducts$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.successGetProducts),
            tap((_) => {
                console.log("Stop Loading")
                this._commonFacade.unsetLoadingPage();
            }),
        ),
        { dispatch: false }
    );

    successProductProccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                ProductActions.successDeleteProducts,
                ProductActions.successCreateProducts,
                ProductActions.successUpdateProducts
            ),
            tap((_) => {
                console.log("Stop Loading")
                this._commonFacade.unsetLoadingPage();
            }),
            switchMap((payload) =>
                this._productService.getProducts().pipe(
                    map((_) => {
                        return ProductActions.getProducts();
                    }),
                    catchError((_) => {
                        const error = { message: 'Ha ocurrido un error' };
                        return of(ProductActions.failureGetProducts({ error }));
                    })
                )
            )
        )
    );

    failureProductProccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(
                ProductActions.failureDeleteProducts,
                ProductActions.failureCreateProducts,
                ProductActions.failureUpdateProducts,
                ProductActions.failureGetProducts
            ),
            tap((_) => {
                console.log("Stop Loading")
                this._commonFacade.unsetLoadingPage();
            }),
        ),
        { dispatch: false }
    );
}
