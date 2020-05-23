import {Component, EventEmitter, Input, Output} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-property-manager',
  templateUrl: './property-manager.component.html',
  styleUrls: ['./property-manager.component.css'],
})
export class PropertyManagerComponent {

  @Input() properties: any;
  @Input() accessory: any;
  @Output() newLocation = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() {
  }

  onAddNewLocation() {
    this.newLocation.emit();
  }

  onSaveProperties() {
    this.save.emit();
  }

  onDeleteCurrentLocation() {
    const locations = Object.keys(this.accessory.properties.props[this.accessory.cma]);
    const index = locations.indexOf(this.accessory.location);
    if (index === -1) {
      return;
    }

    locations.splice(index, 1);
    if (locations.length > 0) {
      delete this.accessory.properties.props[this.accessory.cma][this.accessory.location];
      this.accessory.location = locations[0];
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'This is last location! If you want to remove this accessory' +
          ' from model, you can remove by delete accessory.',
      });
    }
  }

  onDeleteAccessory() {
    Swal.fire({
      icon: 'success',
      title: 'Cok yakinda :)',
    });
  }
}
