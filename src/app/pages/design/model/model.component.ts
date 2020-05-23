import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'ngx-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.css'],
})
export class ModelComponent {

    @Input() model: any;
    @Output() modelSelect = new EventEmitter();

    constructor() {
    }

    onModelSelect() {
        this.modelSelect.emit();
    }

    onPan(event) {

        const sensitivity = 80;

        if ( event.deltaX < sensitivity / 2 && event.deltaX > - sensitivity / 2 ) {
            this.model.startAngle = this.model.angle;
        }

        const sum = this.model.startAngle + Math.round(event.deltaX / sensitivity);
        if ( Math.abs(sum % 8) === 0 ) {
            this.model.angle = 0;
        } else if ( sum < 0 && sum ) {
            this.model.angle = 8 + (sum % 8);
        } else {
            this.model.angle = sum % 8;
        }
    }
}
