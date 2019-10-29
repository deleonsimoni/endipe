import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from '../pipes/pipes.module';
import { AdminRoutingModule } from './admin.routing';

import { SubscribedComponent } from './subscribed/subscribed.component';
import { NewsComponent } from './news/news.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';
import { WorksComponent } from './works/works.component';

import { ModalNewsComponent } from './modal-news/modal-news.component';
import { ModalCoordinatorComponent } from './modal-coordinator/modal-coordinator.component';
import { ModalReviewerComponent } from './modal-reviewer/modal-reviewer.component';

import { SubscribersMetricsComponent } from './components/subscribers-metrics/subscribers-metrics.component';
import { SubscribersCardComponent } from './components/subscribers-card/subscribers-card.component';
import { WorkContentComponent } from './components/work-content/work-content.component';
import { QuillModule } from 'ngx-quill';
import { SubscribersDataComponent } from './components/subscribers-data/subscribers-data.component';
import { WorkCardComponent } from './components/work-card/work-card.component';

@NgModule({
    declarations: [
        AdminComponent,
        SubscribedComponent,
        NewsComponent,
        RegisterCoordinatorComponent,
        WorksComponent,
        ModalNewsComponent,
        ModalCoordinatorComponent,
        ModalReviewerComponent,
        SubscribersMetricsComponent,
        SubscribersCardComponent,
        WorkContentComponent,
        SubscribersDataComponent,
        WorkCardComponent
    ],
    entryComponents: [
        AdminComponent,
        ModalNewsComponent,
        ModalCoordinatorComponent,
        ModalReviewerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot(),
        QuillModule.forRoot(),
        PipesModule,
        AdminRoutingModule
    ],
    exports: [
        AdminComponent
    ],
})
export class AdminModule { }
