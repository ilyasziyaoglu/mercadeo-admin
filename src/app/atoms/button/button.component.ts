import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-button',
    template: `
        <button class="btn-lg rounded-0 w-100">{{label}} <i [class]="icon"></i></button>`,
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() icon: string;
    @Input() label: string;
}
