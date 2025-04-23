import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { ProductsService } from '../../features/products/services/products.service';
import { Product } from '../../features/products/models/products.model';
import { CommonFacade } from '../../facades/common.facade';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MODAL_IDS } from '../../core/constants/modal.constants';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
    constructor(
        private _actions$: Actions,
        private _productService: ProductsService,
        private _commonFacade: CommonFacade,
        private _router: Router,
        private _toastr: ToastrService,
        private _store: Store
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
                    catchError((error) => {
                        this._toastr.error('Error al cargar productos: ' + error.message);
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
                            this._toastr.success('Producto creado correctamente');
                            this._commonFacade.closeModal(MODAL_IDS.CREATE_PRODUCT);
                            this._store.dispatch(ProductActions.resetProductForm());
                            return ProductActions.successCreateProducts();
                        }),
                        catchError((error) => {
                            this._toastr.error('Error al crear producto: ' + error.message);
                            return of(ProductActions.failureCreateProducts({ error }));
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
                        this._toastr.success('Producto actualizado correctamente');
                        return ProductActions.successUpdateProducts();
                    }),
                    catchError((error) => {
                        this._toastr.error('Error al actualizar producto: ' + error.message);
                        return of(ProductActions.failureUpdateProducts({ error }));
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
                        this._toastr.success('Producto eliminado correctamente');
                        return ProductActions.successDeleteProducts();
                    }),
                    catchError((error) => {
                        this._toastr.error('Error al eliminar producto: ' + error.message);
                        return of(ProductActions.failureDeleteProducts({ error }));
                    })
                )
            )
        )
    );

    getProductDetail$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.getProductDetail),
            tap((_) => {
                this._router.navigate(['/products/product-details']);
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
                    this._commonFacade.setLoadingPage();
                })
            ),
        { dispatch: false }
    )

    successGetProducts$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.successGetProducts),
            tap((_) => {
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
                this._commonFacade.unsetLoadingPage();
            }),
            switchMap((payload) =>
                this._productService.getProducts().pipe(
                    map((_) => {
                        return ProductActions.getProducts();
                    }),
                    catchError((error) => {
                        this._toastr.error('Error al recargar productos: ' + error.message);
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
                this._commonFacade.unsetLoadingPage();
            }),
        ),
        { dispatch: false }
    );
}
