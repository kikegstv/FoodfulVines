import { Component, ChangeDetectorRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { ToastrService } from 'ngx-toastr';
import { ProductFacade } from '../../../../facades/product.facade';
import { Actions, ofType } from '@ngrx/effects';
import * as ProductActions from '../../../../store/product/product.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: Product | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSubmitted = new EventEmitter<void>();

  productForm!: FormGroup;
  file!: File;
  imagePreview: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ProductsService,
    private productFacade: ProductFacade,
    private toastr: ToastrService,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listenToResetAction();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product && this.productForm) {
      this.populateForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatPrice(event: any): void {
    console.log(event.target.value);
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });

    if (this.product && this.isEditMode) {
      this.populateForm();
    }
  }

  private populateForm(): void {
    this.productForm.patchValue({
      id: this.product?.id,
      name: this.product?.name,
      description: this.product?.description,
      price: this.product?.price,
      quantity: this.product?.quantity,
      imageUrl: this.product?.imageUrl
    });

    this.imagePreview = this.product?.imageUrl || null;
  }

  private listenToResetAction(): void {
    this.subscription.add(
      this.actions$.pipe(
        ofType(ProductActions.resetProductForm)
      ).subscribe(() => {
        this.productForm.reset();
        this.file = undefined as unknown as File;
        this.imagePreview = null;
      })
    );
  }

  handleFileInput(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.productForm.patchValue({ imageUrl: this.file.name });
      this.cdr.markForCheck();

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;

      if (this.isEditMode) {
        if (this.file) {
          // Si se seleccionó un nuevo archivo, subirlo y actualizar el producto
          this.productService.uploadImage(this.file, `products/${new Date().getTime()}_${this.file.name}`).subscribe({
            next: (imageUrl) => {
              productData.imageUrl = imageUrl;
              this.productFacade.updateProductData(productData);
              this.toastr.success('¡Producto actualizado con éxito!');
              this.formSubmitted.emit();
            },
            error: (error) => this.toastr.error('Error al subir la imagen: ' + error)
          });
        } else {
          // Mantener la URL de imagen existente y actualizar el producto
          this.productFacade.updateProductData(productData);
          this.toastr.success('¡Producto actualizado con éxito!');
          this.formSubmitted.emit();
        }
      } else {
        // Crear un nuevo producto
        if (this.file) {
          this.productFacade.createProductData(productData, this.file);
          this.toastr.success('¡Producto agregado con éxito!');
          this.formSubmitted.emit();
        } else {
          this.toastr.error('Por favor, selecciona una imagen para el producto.');
        }
      }
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.');
    }
  }
}
