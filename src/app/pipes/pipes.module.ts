import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe
    ],
    exports: [
        MaskCpfPipe
    ],
})
export class PipesModule { }
