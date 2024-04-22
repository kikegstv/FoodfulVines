import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: 'product-list', component: ProductListComponent,
            },
            { path: '', redirectTo: 'product-list', pathMatch: 'full' },
        ],
    },

    { path: '**', redirectTo: 'products' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
