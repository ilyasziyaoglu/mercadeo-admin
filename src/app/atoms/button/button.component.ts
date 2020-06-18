import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngx-button',
    template: `
        <button class="btn w-100" [type]="type">{{label}} <i [class]="icon"></i></button>`,
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() icon: string;
    @Input() label: string;
    @Input() type: string;
}
