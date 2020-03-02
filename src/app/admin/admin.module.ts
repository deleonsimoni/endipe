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
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { WorksComponent } from './works/works.component';

import { SubscribersMetricsComponent } from './components/subscribers-metrics/subscribers-metrics.component';
import { SubscribersCardComponent } from './components/subscribers-card/subscribers-card.component';
import { WorkContentComponent } from './components/work-content/work-content.component';
import { SubscribersDataComponent } from './components/subscribers-data/subscribers-data.component';
import { WorkCardComponent } from './components/work-card/work-card.component';
import { ConferencerComponent } from './conferencer/conferencer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalModule } from './modals/modal.module';
import { ConferencerCardComponent } from './components/conferencer-card/conferencer-card.component';
import { UtilNgxMaterialModule } from '../util-ngx-material/util-ngx-material.module';
import { VincularTrabalhosComponent } from './vincular-trabalhos/vincular-trabalhos.component';
import { WorkDataComponent } from './work-data/work-data.component';
import { ModalReviewAdminComponent } from './modals/modal-review-admin/modal-review-admin.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ReviewListWorksComponent } from './review-list-works/review-list-works.component';
import { ModalReviewReviewerComponent } from './modals/modal-review-reviewer/modal-review-reviewer.component';
import { GlobalComponentsModule } from '../components/global-components.module';

@NgModule({
    declarations: [
        AdminComponent,
        SubscribedComponent,
        NewsComponent,
        CoordinatorComponent,
        WorksComponent,
        SubscribersMetricsComponent,
        SubscribersCardComponent,
        WorkContentComponent,
        SubscribersDataComponent,
        WorkCardComponent,
        ConferencerComponent,
        NotFoundComponent,
        ConferencerCardComponent,
        VincularTrabalhosComponent,
        WorkDataComponent,
        SchedulesComponent,
        ReviewListWorksComponent,
    ],
    entryComponents: [
        AdminComponent,
        ModalReviewAdminComponent,
        ModalReviewReviewerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot(),
        PipesModule,
        ModalModule,
        AdminRoutingModule,
        GlobalComponentsModule,
        UtilNgxMaterialModule
    ],
    exports: [
        AdminComponent
    ],
})
export class AdminModule { }
