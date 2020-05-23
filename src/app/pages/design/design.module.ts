import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignComponent } from './design.component';
import {FormsModule} from '@angular/forms';
import {ModelGalleryComponent} from './model-gallery/model-gallery.component';
import {AccessoryGalleryComponent} from './accessory-gallery/accessory-gallery.component';
import {ModelComponent} from './model/model.component';
import {AccessoryComponent} from './accessory/accessory.component';
import {ColorManagerComponent} from './color-manager/color-manager.component';
import {PropertyManagerComponent} from './property-manager/property-manager.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DesktopComponent} from './desktop/desktop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NbCardModule} from '@nebular/theme';

@NgModule({
  declarations: [
    DesignComponent,
    ModelGalleryComponent,
    AccessoryGalleryComponent,
    DesktopComponent,
    ModelComponent,
    AccessoryComponent,
    ColorManagerComponent,
    PropertyManagerComponent,
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        FormsModule,
        MatIconModule,
        MatTooltipModule,
        DragDropModule,
        NbCardModule
    ]
})
export class DesignModule { }
