import { NgModule } from '@angular/core';

import {
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatStepperModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class UtilNgxMaterialModule { }
