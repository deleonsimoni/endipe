import { NgModule } from "@angular/core";
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        ScheduleCardComponent
    ],
    imports: [
        CommonModule,
        PipesModule
    ],
    exports: [
        ScheduleCardComponent
    ]
})
export class GlobalComponentsModule { }
