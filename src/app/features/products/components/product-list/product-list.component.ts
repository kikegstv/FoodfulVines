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
    public productList$!: Observable<Product[] | null>;
    private modalSubs: Subscription = new Subscription();

    public MODAL_IDS = MODAL_IDS;

    constructor(
        private _productFacade: ProductFacade,
        private productService: ProductsService,
        private commonFacade: CommonFacade,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        console.log('Product List Component initialized');
        this.toastr.success('Productos cargados correctamente');
        this._productFacade.getProductData();
        this.productList$ = this._productFacade.productData$;

        this.modalSubs.add(
            this.commonFacade.getModalState(this.MODAL_IDS.CREATE_PRODUCT).subscribe(isOpen => {
                this.isModalVisible = isOpen;
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

    showModal(): void {
        this.commonFacade.openModal(MODAL_IDS.CREATE_PRODUCT);
    }

    closeModal(): void {
        this.commonFacade.closeModal(MODAL_IDS.CREATE_PRODUCT);
    }
}
