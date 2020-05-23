import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AccessoryService} from '../../../services/accessory.service';
import {ModelAccessoryService} from '../../../services/model-accessory.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {DesignService} from '../design.service';

@Component({
    selector: 'ngx-desktop',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopComponent {

    environment = environment;
    JSON = JSON;
    Object = Object;

    @Input() model: any;
    @Input() accessories: any = [];
    @Input() currentElement: any;
    @Input() currentColorModel: any;

    constructor(
        private designService: DesignService,
        private accessoryService: AccessoryService,
        private propertiesService: ModelAccessoryService,
    ) {
        designService.accessories = this.accessories;
        designService.currentModel = this.model;
        designService.currentAccessory = this.currentElement;
    }

    onModelElementSelect() {
        if ( this.currentElement ) {
            this.currentElement.isActive = false;
        }
        this.model.isActive = true;
        this.currentColorModel = this.model;
    }

    onAccessoryElementSelect(accessory: any) {
        this.model.isActive = false;
        if ( this.currentElement ) {
            this.currentElement.isActive = false;
        }
        accessory.isActive = true;
        this.currentElement = accessory;
        this.currentColorModel = accessory;
        this.currentElement.location = this.currentElement.location ? this.currentElement.location : 0;
    }

    onRemoveAccessoryElement(accessory: any) {
        for (let i = 0; i < this.accessories.length; i ++) {
            if ( this.accessories[i] == accessory ) {
                this.accessories.splice(i, 1);
                break;
            }
        }
    }

    onAddNewLocation() {
        const location = {};
        for (let i = 0; i < 10; i ++) {
            location[i] = {
                'disabled': false,
                'rotate': 0,
                'angle': 0,
                'x': 350,
                'y': 300,
                // 'coords': 'translate3d(0px, 0px, 0px);'
            };
        }

        const newLocationIndex = Object.keys(this.currentElement.properties.props[this.currentElement.cma]).length;
        this.currentElement.properties.props[this.currentElement.cma][newLocationIndex] = {...location};
        this.currentElement.location = newLocationIndex;
    }

    onSaveProperties() {
        this.currentElement.properties.modelId = this.model.id;
        this.propertiesService.saveProperties(this.currentElement.properties);
        this.accessoryService.update(this.currentElement);
    }

    sum(arr: any, key: string) {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    onDragEnded(event: CdkDragEnd) {
        if ( this.currentElement.isAccessory ) {
            // const coords = event.source.element.nativeElement.attributes[3].nodeValue.slice(138);
            this.currentElement.properties.props[this.currentElement.cma][this.currentElement.location][this.model.angle].x += event.distance.x;
            this.currentElement.properties.props[this.currentElement.cma][this.currentElement.location][this.model.angle].y += event.distance.y;
            // console.log(coords);
        }
    }
}
