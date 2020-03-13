import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { AxisPipe } from './axis.pipe';
import { ModalitiesPipe } from './modalities.pipe';
import { TypeWorkPipe } from './type-work.pipe';
import { TypeWorkRelatorioPipe } from './type-work-relatorio.pipe';

import { DocPipe } from './doc.pipe';
import { ContagemModalidadePipe } from './contagem-modalidade.pipe';
import { CategoryPaymentPipe } from './category-payment.pipe';
import { ArraySortPipe } from './array-sort.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe,
        ArraySortPipe,
        TypeWorkRelatorioPipe
    ],
    exports: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe,
        ArraySortPipe,
        TypeWorkRelatorioPipe
    ],
})
export class PipesModule { }
