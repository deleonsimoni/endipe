import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

import { GenericCardComponent } from './generic-card/generic-card.component';
import { SimposioCardComponent } from './simposio-card/simposio-card.component';
import { WorkScheduleCardComponent } from './work-schedule-card/work-schedule-card.component'

@NgModule({
    declarations: [
        GenericCardComponent,
        SimposioCardComponent,
        WorkScheduleCardComponent
    ],
    imports: [
        CommonModule,
        PipesModule
    ],
    exports: [
        GenericCardComponent,
        SimposioCardComponent,
        WorkScheduleCardComponent
    ]
})
export class GlobalComponentsModule { }
