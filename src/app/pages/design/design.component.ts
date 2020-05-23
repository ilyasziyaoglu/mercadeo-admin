import {AfterViewInit, Component} from '@angular/core';
import {ModelService} from '../../services/model.service';
import {AccessoryService} from '../../services/accessory.service';
import {ModelAccessoryService} from '../../services/model-accessory.service';

@Component({
  selector: 'ngx-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements AfterViewInit {
  models: any = [];
  accessories: any = [];
  currentModel: any;
  currentElement: any;
  currentColorModel: any;
  currentAccessories: any = [];
  currentMatTabIndex = 0;

  constructor(
    private modelService: ModelService,
    private accessoryService: AccessoryService,
    private propertiesService: ModelAccessoryService,
  ) {}

  ngAfterViewInit(): void {
    const self = this;
    this.modelService.getModels(models => {
      self.models = models;
    });
  }

  onModelSelect(model) {
    if (!this.currentModel || model.id !== this.currentModel.id) {
      model.colors = model.colors || {
        'original': {
          'hue': 0,
          'saturate': 100,
          'contrast': 100,
          'brightness': 1,
          'grayscale': 0,
          'sepia': 0,
        },
      };
      model.currentColor = Object.keys(model.colors)[0];
      model.isModel = true;
      this.currentModel = model;
      this.currentColorModel = model;
      this.currentModel.angle = 0;
      this.accessoryService.getAllStructured(accessories => {
        this.accessories = accessories;
        this.currentMatTabIndex = accessories ? 1 : 0;
      });
    } else {
      this.currentMatTabIndex = this.accessories ? 1 : 0;
    }
  }

  onAccessorySelect(accessory) {
    const isAccessoryExists = this.currentAccessories.find(a => accessory.id === a.id);
    if (!isAccessoryExists) {
      let newAccessory = {...accessory};
      this.currentModel.isActive = false;
      this.currentColorModel = newAccessory;
      this.propertiesService.getProperties(this.currentModel.id, newAccessory.id, properties => {
        newAccessory.properties = properties;
        newAccessory.cma = this.currentModel.angle;
        if (this.currentElement ) {
          this.currentElement.isActive = false;
        }
        newAccessory.isActive = true;
        newAccessory.isAccessory = true;
        newAccessory = this.accessoryService.setPropertyDefaults(this.currentModel.id, newAccessory);
        this.currentAccessories.push(newAccessory);
        this.currentElement = newAccessory;
      });
    }
  }
}
