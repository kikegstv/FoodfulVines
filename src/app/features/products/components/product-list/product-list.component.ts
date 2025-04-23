import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductFacade } from '../../../../facades/product.facade';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { CommonFacade } from '../../../../facades/common.facade';
import { MODAL_IDS } from '../../../../core/constants/modal.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
    public productSubs!: Subscription;
    public isModalVisible: boolean = false;
    public isConfirmationModalVisible: boolean = false;
    public productList$!: Observable<Product[] | null>;
    private modalSubs: Subscription = new Subscription();
    private productToDelete: string | undefined;

    public selectedProduct: Product | null = null;
    public isEditMode: boolean = false;
    public MODAL_IDS = MODAL_IDS;

    constructor(
        private _productFacade: ProductFacade,
        private productService: ProductsService,
        private commonFacade: CommonFacade,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        console.log('Product List Component initialized');
        this._productFacade.getProductData();
        this.productList$ = this._productFacade.productData$;

        this.modalSubs.add(
            this.commonFacade.getModalState(this.MODAL_IDS.CREATE_PRODUCT).subscribe(isOpen => {
                this.isModalVisible = isOpen;
            })
        );

        this.modalSubs.add(
            this.commonFacade.getModalState(this.MODAL_IDS.CONFIRMATION_MODAL).subscribe(isOpen => {
                this.isConfirmationModalVisible = isOpen;
            })
        );
    }

    ngOnDestroy(): void {
        if (this.productSubs) {
            this.productSubs.unsubscribe();
        }
        this.modalSubs.unsubscribe();
    }

    getProductDetails(product: Product): void {
        console.log('Product Detail', product)
        this._productFacade.getProductDetail(product);
    }

    showModal(product?: Product): void {
        if (product) {
            this.selectedProduct = product;
            this.isEditMode = true;
        } else {
            this.selectedProduct = null;
            this.isEditMode = false;
        }
        this.commonFacade.openModal(MODAL_IDS.CREATE_PRODUCT);
    }

    closeModal(): void {
        this.commonFacade.closeModal(MODAL_IDS.CREATE_PRODUCT);
    }

    editProduct(product: Product, event: Event): void {
        event.stopPropagation();
        this.showModal(product);
    }

    confirmDelete(event: Event, product: Product): void {
        event.stopPropagation(); // Prevenir navegación al detalle del producto
        this.productToDelete = product.id;
        this.commonFacade.openModal(MODAL_IDS.CONFIRMATION_MODAL);
    }

    deleteProduct(): void {
        if (this.productToDelete) {
            this._productFacade.deleteProductData(this.productToDelete);
            this.productToDelete = undefined;
            this.toastr.success('Producto eliminado correctamente');
        }
        this.closeConfirmationModal();
    }

    closeConfirmationModal(): void {
        this.commonFacade.closeModal(MODAL_IDS.CONFIRMATION_MODAL);
    }
}
