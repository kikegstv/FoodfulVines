import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as productSelectors from '../store/product/product.selectors';
import * as productActions from '../store/product/product.actions';
import { Product } from '../features/products/models/products.model';

@Injectable({ providedIn: 'root' })

export class ProductFacade {

  public loadingPage$: Observable<boolean>;
  public productData$: Observable<Product[] | null>;

  constructor(private _store: Store) {
    this.loadingPage$ = this._store.select(productSelectors.selectLoadingPage);
    this.productData$ = this._store.select(
      productSelectors.selectTodos
    );
  }

  public getProductData() {
    this._store.dispatch(productActions.getProducts());
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
