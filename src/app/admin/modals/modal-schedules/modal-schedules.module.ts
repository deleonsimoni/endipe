import { NgModule } from '@angular/core';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSchedulesComponent } from './modal-schedules.component';

@NgModule({
    declarations: [
        ModalSchedulesComponent,
        GenericFormComponent
    ],
    entryComponents: [
        ModalSchedulesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalSchedulesComponent,
        GenericFormComponent
    ]
})
export class ModalSchedulesModule { }
