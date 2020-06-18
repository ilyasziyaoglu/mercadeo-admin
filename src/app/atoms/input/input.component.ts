import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'ngx-input',
    template: `
        <div class="row m-0 w-100">
            <label *ngIf="label" for="input">{{label}}</label>
            <input class="rounded" id="input" [(ngModel)]="value" [type]="type" [min]="min" [max]="max"
                   (change)="change.emit($event)"
                   nbInput fullWidth
                   placeholder="{{placeholder}}">
        </div>
    `,
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() type: string;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() min: number;
    @Input() max: number;
    @Input() value: number;
    @Output() change = new EventEmitter();
}
