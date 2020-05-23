import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogComponent} from './catalog.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule, NbInputModule, NbListModule,
    NbRadioModule,
    NbSelectModule,
} from '@nebular/theme';
import {FilterComponent} from './filter/filter.component';
import {MatSliderModule} from '@angular/material/slider';
import {DetailComponent} from './detail/detail.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CatalogRouterModule} from './catalog-router.module';
import {CatalogHomeComponent} from './catalog-home/catalog-home.component';
import {AtomsModule} from '../../atoms/atoms.module';

@NgModule({
    declarations: [CatalogComponent, ProductCardComponent, FilterComponent, DetailComponent, CatalogHomeComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbSelectModule,
        MatSliderModule,
        NbRadioModule,
        NbButtonModule,
        NbContextMenuModule,
        FormsModule,
        NbListModule,
        NbInputModule,
        RouterModule,
        CatalogRouterModule,
        AtomsModule
    ],
    exports: [
        ProductCardComponent,
        FilterComponent,
        DetailComponent,
        ProductCardComponent,
        CatalogComponent,
        CatalogHomeComponent,
    ],
})
export class CatalogModule {}
