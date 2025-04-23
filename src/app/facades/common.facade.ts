import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as commonSelectors from '../store/common/common.selectors';
import * as commonActions from '../store/common/common.actions';

@Injectable({ providedIn: 'root' })
export class CommonFacade {
    public loadingPage$: Observable<boolean>;

    constructor(private _store: Store) {
        this.loadingPage$ = this._store.select(commonSelectors.selectLoadingPage);
    }

    public setLoadingPage() {
        this._store.dispatch(commonActions.startLoading());
    }

    public unsetLoadingPage() {
        this._store.dispatch(commonActions.stopLoading());
    }

    public openModal(modalId: string, data?: any) {
        this._store.dispatch(commonActions.openModal({ modalId, data }));
    }

    public closeModal(modalId: string) {
        this._store.dispatch(commonActions.closeModal({ modalId }));
    }

    public closeAllModals() {
        this._store.dispatch(commonActions.closeAllModals());
    }

    public getModalState(modalId: string): Observable<boolean> {
        return this._store.select(commonSelectors.selectModalState(modalId));
    }

    public getModalData(modalId: string): Observable<any> {
        return this._store.select(commonSelectors.selectModalData(modalId));
    }
}
