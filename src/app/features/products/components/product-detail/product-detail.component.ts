import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/products.model';
import { Observable, Subscription } from 'rxjs';
import { ProductFacade } from '../../../../facades/product.facade';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    product!: Product;
    productSubs!: Subscription;
    product$!: Observable<Product>;
    quantity: number = 1;

    constructor(
        private _productFacade: ProductFacade,
        private router: Router
    ) {}

    ngOnInit() {
        this.productSubs = this._productFacade.productDetail$.subscribe((product) => {
            console.log('Product Detail', product);
            this.product = product!;
        });
    }

    ngOnDestroy() {
        if (this.productSubs) {
            this.productSubs.unsubscribe();
        }
    }

    addToCart() {
        console.log('Agregar al carrito', this.product, this.quantity);
    }

    onQuantityChange(event: any) {
        this.quantity = event.target.value;
    }

    goBack() {
        this.router.navigate(['/products/product-list']);
    }
}
