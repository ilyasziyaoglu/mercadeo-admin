import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccessoryService} from '../../../services/accessory.service';

@Component({
  selector: 'ngx-accessory-gallery',
  templateUrl: './accessory-gallery.component.html',
  styleUrls: ['./accessory-gallery.component.css'],
})
export class AccessoryGalleryComponent {

  Object = Object;

  @Input() accessories: any = [];
  @Output() accessorySelect = new EventEmitter();

  subType: string;
  currentSubtypeIndex: number;

  constructor(
    private accessoryService: AccessoryService,
  ) {
  }

  onSelectAccessory(accessory: any) {
    this.accessorySelect.emit(accessory);
  }

  onSubTypeSelect(subType, index) {
    this.subType = subType;
    this.currentSubtypeIndex = index;
  }
}
