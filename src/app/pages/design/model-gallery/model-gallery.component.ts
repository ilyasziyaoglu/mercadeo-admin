import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ngx-model-gallery',
  templateUrl: './model-gallery.component.html',
  styleUrls: ['./model-gallery.component.css'],
})
export class ModelGalleryComponent {

  @Input() models: any;
  @Output() modelSelect = new EventEmitter();


  constructor() { }

  onSelectModel(model) {
    this.modelSelect.emit(model);
  }
}
