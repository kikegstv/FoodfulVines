import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './services/products.service';
import { Product } from './models/products.model';
import { Observable, Subscription } from 'rxjs';
import { ProductFacade } from '../../facades/product.facade';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent {
    productForm!: FormGroup;
    public isLoadingSubs!: Subscription;

    file!: File;

    constructor(
        private fb: FormBuilder,
        private productService: ProductsService,
    ) {}

    ngOnInit(): void {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            price: [0, [Validators.required, Validators.min(0.01)]],
            quantity: [0, [Validators.required, Validators.min(1)]],
            imageUrl: ['', Validators.required],
        });
    }

    handleFileInput(event: any): void {
        this.file = event.target.files[0];
        this.productForm.patchValue({ imageUrl: this.file.name });
    }

    submitProduct(): void {
        if (this.productForm.valid && this.file) {
            const productData: Product = this.productForm.value;
            this.productService
                .createProduct(productData, this.file)
                .subscribe({
                    next: () => alert('Producto agregado con éxito'),
                    error: (error) =>
                        alert('Error al agregar el producto: ' + error),
                });
        } else {
            alert(
                'Por favor, completa el formulario correctamente y asegúrate de haber seleccionado una imagen.'
            );
        }
    }
}
