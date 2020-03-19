import { NgModule } from '@angular/core';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSchedulesComponent } from './modal-schedules.component';
import { SimposioFormComponent } from './components/simposio-form/simposio-form.component';
import { UtilNgxMaterialModule } from 'src/app/util-ngx-material/util-ngx-material.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { WorkScheduleFormComponent } from './components/work-schedule-form/work-schedule-form.component';

@NgModule({
    declarations: [
        ModalSchedulesComponent,
        GenericFormComponent,
        SimposioFormComponent,
        WorkScheduleFormComponent
    ],
    entryComponents: [
        ModalSchedulesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    exports: [
        ModalSchedulesComponent,
        GenericFormComponent,
        SimposioFormComponent,
        WorkScheduleFormComponent
    ]
})
export class ModalSchedulesModule { }
