import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-input',
    template: `
        <label *ngIf="label" for="input">{{label}}</label>
        <input id="input" [(ngModel)]="value" [type]="type" [min]="min" [max]="max"
               nbInput fullWidth
               placeholder="{{placeholder}}">
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
}
