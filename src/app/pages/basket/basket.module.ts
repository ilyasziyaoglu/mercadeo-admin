import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasketCardComponent} from './basket-card/basket-card.component';
import {NbCardModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BasketComponent} from './basket.component';

@NgModule({
    declarations: [
        BasketComponent,
        BasketCardComponent,
    ],
    exports: [
        BasketCardComponent,
    ],
    imports: [
        CommonModule,
        NbCardModule,
        NbSelectModule,
        FormsModule,
        NbInputModule,
        RouterModule,
    ],
})
export class BasketModule {
}
