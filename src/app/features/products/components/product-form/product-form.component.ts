import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  file!: File;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productFacade: ProductFacade,
    private toastr: ToastrService,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listenToResetAction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatPrice(event: any): void {
    console.log(event.target.value);
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required]
    });
  }

  private listenToResetAction(): void {
    this.subscription.add(
      this.actions$.pipe(
        ofType(ProductActions.resetProductForm)
      ).subscribe(() => {
        this.productForm.reset();
        this.file = undefined as unknown as File;
      })
    );
  }

  handleFileInput(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.productForm.patchValue({ imageUrl: this.file.name });
      this.cdr.markForCheck();
    }
  }

  submitProduct(): void {
    if (this.productForm.valid && this.file) {
      const productData: Product = this.productForm.value;
      this.productFacade.createProductData(productData, this.file);
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente y asegúrate de haber seleccionado una imagen.');
    }
  }
}
