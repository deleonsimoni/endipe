import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { AxisPipe } from './axis.pipe';
import { ModalitiesPipe } from './modalities.pipe';
import { TypeWorkPipe } from './type-work.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe
    ],
    exports: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe
    ],
})
export class PipesModule { }
