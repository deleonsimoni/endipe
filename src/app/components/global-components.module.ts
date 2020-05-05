import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

import { GenericCardComponent } from './generic-card/generic-card.component';
import { SimposioCardComponent } from './simposio-card/simposio-card.component';
import { WorkScheduleCardComponent } from './work-schedule-card/work-schedule-card.component'
import { WorkCardComponent } from './work-card/work-card.component';
import { WorkDataComponent } from './work-data/work-data.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        GenericCardComponent,
        SimposioCardComponent,
        WorkScheduleCardComponent,
        WorkCardComponent,
        WorkDataComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        RouterModule,

    ],
    exports: [
        GenericCardComponent,
        SimposioCardComponent,
        WorkScheduleCardComponent,
        WorkCardComponent,
        WorkDataComponent,
    ]
})
export class GlobalComponentsModule { }
