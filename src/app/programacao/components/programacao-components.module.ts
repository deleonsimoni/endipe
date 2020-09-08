import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningScheduleCardComponent } from './opening-schedule-card/opening-schedule-card.component';
import { InscrevaseComponent } from './inscrevase/inscrevase.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UtilNgxMaterialModule } from 'src/app/util-ngx-material/util-ngx-material.module';
import { GlobalComponentsModule } from 'src/app/components/global-components.module';

@NgModule({
    declarations: [
        OpeningScheduleCardComponent,
        InscrevaseComponent,
        
    ],
    imports: [
        CommonModule,
        UtilNgxMaterialModule,
        PipesModule,
        GlobalComponentsModule,
    ],
    exports: [
        OpeningScheduleCardComponent
    ]
})
export class ProgramacaoComponentsModule { }
