import {Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {AccessoryService} from '../../../services/accessory.service';
import {ModelService} from '../../../services/model.service';

@Component({
  selector: 'ngx-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.css'],
})
export class ColorManagerComponent implements OnInit{

  @Input() currentColorModel: any;
  currentColorName: string;

  constructor(
    private accessoryService: AccessoryService,
    private modelService: ModelService,
  ) {
  }

  ngOnInit(): void {
    this.currentColorName = Object.keys(this.currentColorModel.colors)[0];
  }

  onColorSelect(color) {
    this.currentColorModel.currentColor = this.currentColorModel.colors[color.key];
    this.currentColorName = color.key;
  }

  onColorAdd() {
    Swal.fire({
      title: 'Enter color code or CSS name',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need type a color name!';
        }
      },
    }).then(result => {
      this.currentColorModel.colors[result.value] = {
        'hue': 0,
        'saturate': 100,
        'contrast': 100,
        'brightness': 1,
        'grayscale': 0,
        'sepia': 0,
      };
      this.currentColorModel.currentColor = this.currentColorModel.colors[result.value];
      this.currentColorName = result.value;
    });
  }

  onSaveColors() {
    if (this.currentColorModel.isAccessory) {
      this.accessoryService.updateColors(this.currentColorModel);
    }

    if (this.currentColorModel.isModel) {
      this.modelService.saveColors(this.currentColorModel);
    }
  }

  onDeleteColor() {
    delete this.currentColorModel.colors[this.currentColorName];
  }

  onRenameColor(currentColorName) {
    Swal.fire({
      title: 'Enter color code or CSS name',
      input: 'text',
      inputValue: currentColorName,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need type a color name!';
        }
      },
    }).then(result => {
      this.currentColorModel.colors[result.value] = {...this.currentColorModel.colors[currentColorName]};
      delete this.currentColorModel.colors[currentColorName];
      this.currentColorModel.currentColor = this.currentColorModel.colors[result.value];
      this.currentColorName = result.value;
    });
  }
}
