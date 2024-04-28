import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { CommonFacade } from '../../../facades/common.facade';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
    @Input() isVisible: boolean = false;
    public isLoadingSubs!: Subscription
    public isLoading$: Observable<boolean> = this.commonFacade.loadingPage$;

    private spinnerConfig: Spinner = {
        type: 'ball-scale-multiple',
        size: 'large',
        bdColor: 'rgba(255, 255, 255, 0.8)',
        color: '#fff',
        fullScreen: true,
        zIndex: 9999,
    };

    constructor(
        private spinner: NgxSpinnerService,
        private commonFacade: CommonFacade
    ) {}

    ngOnInit() {
        this.isLoadingSubs = this.isLoading$.subscribe((isLoading: boolean) => {
            if (isLoading) {
                this.spinner.show(undefined, this.spinnerConfig);
            } else {
                this.spinner.hide();
            }
        });
    }
}
