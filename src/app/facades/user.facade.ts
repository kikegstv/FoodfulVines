import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userSelectors from '../store/user/user.selectors';
import * as userActions from '../store/user/user.actions';
import { User } from '../features/auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserFacade {
    public userData$!: Observable<User | null>;

    constructor(private _store: Store) {
        this.userData$ = this._store.select(userSelectors.selectUser);
    }

    public loginUser(email: string, password: string) {
        this._store.dispatch(userActions.loginUser({ email, password }));
    }

    public getUserData(uid: string) {
        this._store.dispatch(userActions.getUser({ uid }));
    }
    public createUser(user: User) {
        this._store.dispatch(userActions.createUser({ user }));
    }
}
