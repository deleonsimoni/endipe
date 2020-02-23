import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { AxisPipe } from './axis.pipe';
import { ModalitiesPipe } from './modalities.pipe';
import { TypeWorkPipe } from './type-work.pipe';
import { DocPipe } from './doc.pipe';
import { ContagemModalidadePipe } from './contagem-modalidade.pipe';
import { CategoryPaymentPipe } from './category-payment.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe
    ],
    exports: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe
    ],
})
export class PipesModule { }
