import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'product-list', component: ProductListComponent,
            },
            {
                path: 'product-details', component: ProductDetailComponent,
            },
            {
                path: 'product-cart', component: ProductCartComponent,
            },
            { path: '', redirectTo: 'product-list', pathMatch: 'full' },
        ],
    },

    {
        path: '**',
        redirectTo: 'products',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
