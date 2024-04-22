import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ProductFacade } from '../../../facades/product.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
    public isLoadingSubs!: Subscription
    public isLoading$: Observable<boolean> = this.productFacade.loadingPage$;

    private spinnerConfig: Spinner = {
        type: 'ball-scale-multiple',
        size: 'large',
        bdColor: 'rgba(255, 255, 255, 0.8)',
        color: '#fff',
        fullScreen: true,
        zIndex: 9999,
    };

    constructor(private spinner: NgxSpinnerService, private productFacade: ProductFacade) {}

    ngOnInit() {
        console.log("Spinner")
        this.isLoadingSubs = this.isLoading$.subscribe((isLoading: boolean) => {
            if (isLoading) {
                this.spinner.show(undefined, this.spinnerConfig);
            } else {
                this.spinner.hide();
            }
        });
    }
}
