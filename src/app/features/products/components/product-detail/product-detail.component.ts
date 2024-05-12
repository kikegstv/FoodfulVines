import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { Observable, Subscription } from 'rxjs';
import { ProductFacade } from '../../../../facades/product.facade';

// Asumimos que tienes un servicio que obtiene los datos del producto
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    product!: Product; // Tipo de dato adecuado según tu modelo de datos
    productSubs!: Subscription;
    product$!: Observable<Product>;
    quantity: number = 1;
    constructor(private _productFacade: ProductFacade) {}

    ngOnInit() {
        // Aquí debes cargar los datos del producto, por ejemplo, desde un API
        this.productSubs = this._productFacade.productDetail$.subscribe((product) => {
            console.log('Product Detail', product);
            this.product = product!;
        });
    }

    addToCart() {
        console.log('Agregar al carrito', this.product, this.quantity);
        // Aquí debes implementar la lógica para añadir el producto al carrito
    }

    onQuantityChange(event: any) {
        this.quantity = event.target.value;
    }
}
