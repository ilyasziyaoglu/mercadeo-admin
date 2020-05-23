import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-textarea',
  template: `
    <label *ngIf="label" for="textarea">{{label}}</label>
    <textarea id="textarea" [(ngModel)]="value" [rows]="rows"
              nbInput fullWidth placeholder="{{placeholder}}"></textarea>
  `,
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {

  @Input() value;
  @Input() label;
  @Input() rows;
  @Input() placeholder;

}
