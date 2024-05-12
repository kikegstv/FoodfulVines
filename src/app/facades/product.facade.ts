import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as productSelectors from '../store/product/product.selectors';
import * as productActions from '../store/product/product.actions';
import { Product } from '../features/products/models/products.model';

@Injectable({ providedIn: 'root' })

export class ProductFacade {
  public productData$: Observable<Product[] | null>;
  public productDetail$: Observable<Product | null>;

  constructor(private _store: Store) {
    this.productData$ = this._store.select(
      productSelectors.selectProduct
    );
    this.productDetail$ = this._store.select(
      productSelectors.selectProductDetail
    );
  }

  public getProductData() {
    this._store.dispatch(productActions.getProducts());
  }
  public getProductDetail(product: Product) {
    this._store.dispatch(productActions.getProductDetail({ product }));
  }
  public createProductData(product: Product, file: File) {
    this._store.dispatch(productActions.createProducts({product, file}));
  }
  public updateProductData(product: Product) {
    this._store.dispatch(productActions.updateProducts({ product }));
  }
  public deleteProductData(productId: string) {
    this._store.dispatch(productActions.deleteProducts({ productId }));
  }

}
