import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {CatalogComponent} from './catalog.component';
import {CatalogHomeComponent} from './catalog-home/catalog-home.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      {
        path: 'detail/:id/:productId',
        component: DetailComponent,
      },
      {
        path: '',
        component: CatalogHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRouterModule { }
