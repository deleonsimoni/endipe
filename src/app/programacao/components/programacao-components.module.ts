import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningScheduleCardComponent } from './opening-schedule-card/opening-schedule-card.component';

@NgModule({
    declarations: [
        OpeningScheduleCardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OpeningScheduleCardComponent
    ]
})
export class ProgramacaoComponentsModule { }
