import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserFacade } from '../../facades/user.facade';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../features/auth/models/user.model';

@Directive({
    selector: '[appRole]',
})
export class RoleDirective {
    private userSubs!: Subscription;
    private userData$!: Observable<User | null>;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService,
        private __userFacade: UserFacade
    ) {}

    ngOnInit(): void {
        const uid = JSON.parse(localStorage.getItem('uid') || '{}');
        this.__userFacade.getUserData(uid);
        if (uid) {
            this.userSubs = this.__userFacade.userData$.subscribe((user) => {
                console.log(user);
                if (user) {
                    this.viewContainer.clear();
                    if (user.isAdmin) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                }
            });
        }
    }
}
