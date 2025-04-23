import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalComponent } from './components/modal/modal.component';
import { RoleDirective } from './directives/role.directive';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ModalComponent,
    RoleDirective,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    ModalComponent,
    RoleDirective,
    ConfirmationModalComponent
  ]
})
export class SharedModule { }
