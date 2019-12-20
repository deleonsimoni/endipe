import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConferencerComponent } from './modal-conferencer/modal-conferencer.component';
import { ModalCoordinatorComponent } from './modal-coordinator/modal-coordinator.component';
import { ModalNewsComponent } from './modal-news/modal-news.component';
import { ModalReviewerComponent } from './modal-reviewer/modal-reviewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ModalReviewAdminComponent } from './modal-review-admin/modal-review-admin.component';
import { UtilNgxMaterialModule } from 'src/app/util-ngx-material/util-ngx-material.module';

@NgModule({
  declarations: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalReviewAdminComponent
  ],
  entryComponents: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilNgxMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  exports: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent
  ]
})
export class ModalModule { }
