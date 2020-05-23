import { Injectable } from '@angular/core';
import {AccessoryService} from '../../services/accessory.service';
import {ModelService} from '../../services/model.service';

@Injectable({
  providedIn: 'root',
})
export class DesignService {

  currentModel: any;
  modelAngle: number = 0;

  accessories: any = [];
  currentAccessory: any;
  currentLocation: any = 0;

  constructor(
      private accessoryService: AccessoryService,
      private modelService: ModelService,
  ) { }

  onModelSelect(model) {

  }

  onModelAngleChange(newModelAngle) {

  }

  onAccessorySelect(accessory) {

  }
}
