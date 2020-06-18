import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrandComponent} from './brand/brand.component';
import {ColorComponent} from './color/color.component';
import {SizeComponent} from './size/size.component';
import {PropertyComponent} from './property/property.component';
import {CategoryComponent} from './category/category.component';
import {ProductComponent} from './product/product.component';
import {UserComponent} from './user/user.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'order',
      component: OrderComponent,
    },
    {
      path: 'brand',
      component: BrandComponent,
    },
    {
      path: 'color',
      component: ColorComponent,
    },
    {
      path: 'size',
      component: SizeComponent,
    },
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'property',
      component: PropertyComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
