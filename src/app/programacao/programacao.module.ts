import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramacaoComponent } from './programacao.component';
import { ProgramacaoComponentsModule } from './components/programacao-components.module';
import { UtilNgxMaterialModule } from '../util-ngx-material/util-ngx-material.module';
import { GlobalComponentsModule } from '../components/global-components.module';

@NgModule({
    declarations: [
        ProgramacaoComponent
    ],
    imports: [
        CommonModule,
        ProgramacaoComponentsModule,
        GlobalComponentsModule,
        UtilNgxMaterialModule
    ],
    exports: [
        ProgramacaoComponent
    ]
})
export class ProgramacaoModule { }
