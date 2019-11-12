import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { AxisPipe } from './axis.pipe';
import { ModalitiesPipe } from './modalities.pipe';
import { TypeWorkPipe } from './type-work.pipe';
import { DocPipe } from './doc.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe
    ],
    exports: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe
    ],
})
export class PipesModule { }
