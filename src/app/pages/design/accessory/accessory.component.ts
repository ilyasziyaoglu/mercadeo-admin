import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss'],
})
export class AccessoryComponent {

  environment = environment;

  @Input() accessory: any;
  @Input() properties: any;
  @Output() accessoryElementRemove = new EventEmitter();

  constructor(
  ) {}

  onRemoveAccessoryElement() {
    this.accessoryElementRemove.emit(this.accessory);
  }
}
