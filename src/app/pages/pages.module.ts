import {NgModule} from '@angular/core';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbMenuModule,
    NbRadioModule,
    NbSelectModule,
    NbTooltipModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {AtomsModule} from '../atoms/atoms.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {BrandComponent} from './brand/brand.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {ColorComponent} from './color/color.component';
import {SizeComponent} from './size/size.component';
import {PropertyComponent} from './property/property.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {UserComponent} from './user/user.component';
import {OrderComponent} from './order/order.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        NbCardModule,
        AtomsModule,
        NbAccordionModule,
        NbRadioModule,
        FormsModule,
        MatIconModule,
        NbTooltipModule,
        NbInputModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatSlideToggleModule,
    ],
    declarations: [
        PagesComponent,
        NotFoundComponent,
        BrandComponent,
        DashboardComponent,
        ProductComponent,
        CategoryComponent,
        ColorComponent,
        SizeComponent,
        PropertyComponent,
        UserComponent,
        OrderComponent,
    ],
    exports: [],
})
export class PagesModule {
}
