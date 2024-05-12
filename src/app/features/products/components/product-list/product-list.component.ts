import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '../../../../facades/product.facade';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
    public productSubs!: Subscription;
    public isModalVisible: boolean = false;
    public productList$!: Observable<Product[] | null>;

    constructor(
        private _productFacade: ProductFacade,
        private productService: ProductsService
    ) {}

    ngOnInit(): void {
        console.log('Product List Component initialized');
        this._productFacade.getProductData();
        this.productList$ = this._productFacade.productData$;
    }

    getProductDetails(product: Product): void {
        console.log('Product Detail', product)
        this._productFacade.getProductDetail(product);
    }

    showModal(): void {
        this.isModalVisible = true;
    }
}
