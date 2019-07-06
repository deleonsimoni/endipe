import { NgModule } from '@angular/core';

import {
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatStepperModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule
  ]
})
export class UtilNgxMaterialModule { }
