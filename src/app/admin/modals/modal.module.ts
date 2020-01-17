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
import { ModalEditProfileComponent } from './modal-edit-profile/modal-edit-profile.component';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalReviewAdminComponent,
    ModalEditProfileComponent
  ],
  entryComponents: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalEditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilNgxMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalEditProfileComponent
  ]
})
export class ModalModule { }
