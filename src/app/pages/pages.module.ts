import { NgModule } from '@angular/core';
import {NbAccordionModule, NbCardModule, NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {DesignModule} from './design/design.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {BasketModule} from './basket/basket.module';
import {CatalogModule} from './catalog/catalog.module';
import { LimitedEditionComponent } from './limited-edition/limited-edition.component';
import { JewelryComponent } from './jewelry/jewelry.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import {MapsModule} from './maps/maps.module';
import { CarouselComponent } from './carousel/carousel.component';
import {AtomsModule} from '../atoms/atoms.module';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DesignModule,
        BasketModule,
        NbCardModule,
        CatalogModule,
        MapsModule,
        AtomsModule,
        NbAccordionModule
    ],
  declarations: [
    PagesComponent,
    HomeComponent,
    NotFoundComponent,
    LimitedEditionComponent,
    JewelryComponent,
    AboutComponent,
    ContactComponent,
    CustomerCareComponent,
    CarouselComponent,
  ],
    exports: [
        CatalogModule,
    ],
})
export class PagesModule {
}
