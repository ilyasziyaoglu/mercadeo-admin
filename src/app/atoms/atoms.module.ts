import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import { InputComponent } from './input/input.component';
import {FormsModule} from '@angular/forms';
import {NbInputModule} from '@nebular/theme';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        TextareaComponent,
    ],
    imports: [
        NbInputModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        ButtonComponent,
        InputComponent,
        TextareaComponent,
    ],
})
export class AtomsModule {
}
