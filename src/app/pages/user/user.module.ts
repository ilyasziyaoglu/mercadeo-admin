import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule, NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule
} from '@nebular/theme';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import {FormsModule} from '@angular/forms';
import {CatalogModule} from "../catalog/catalog.module";

@NgModule({
  declarations: [UserComponent, ProfileComponent, ProfileCardComponent, ProfileInfoComponent, ProfileOrderComponent],
	imports: [
		CommonModule,
		UserRoutingModule,
		NbCardModule,
		NbActionsModule,
		NbTabsetModule,
		NbListModule,
		NbInputModule,
		FormsModule,
		NbSelectModule,
		NbDatepickerModule,
		NbButtonModule,
		NbIconModule,
		CatalogModule
	]
})
export class UserModule { }
