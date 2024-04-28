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
}
