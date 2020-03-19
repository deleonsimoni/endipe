import { NgModule } from '@angular/core';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSchedulesComponent } from './modal-schedules.component';
import { SimposioFormComponent } from './components/simposio-form/simposio-form.component';

@NgModule({
    declarations: [
        ModalSchedulesComponent,
        GenericFormComponent,
        SimposioFormComponent
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
        GenericFormComponent,
        SimposioFormComponent
    ]
})
export class ModalSchedulesModule { }
