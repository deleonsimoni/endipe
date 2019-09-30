import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from '../pipes/pipes.module';
import { SubscribedComponent } from './subscribed/subscribed.component';
import { AdminRoutingModule } from './admin.routing';
import { NewsComponent } from './news/news.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';
import { ModalNewsComponent } from './modal-news/modal-news.component';
import { ModalSubscribedComponent } from './modal-subscribed/modal-subscribed.component';
import { ModalCoordinatorComponent } from './modal-coordinator/modal-coordinator.component';

@NgModule({
    declarations: [
        AdminComponent,
        SubscribedComponent,
        NewsComponent,
        RegisterCoordinatorComponent,
        ModalNewsComponent,
        ModalSubscribedComponent,
        ModalCoordinatorComponent
    ],
    entryComponents: [
        AdminComponent,
        ModalNewsComponent,
        ModalSubscribedComponent,
        ModalCoordinatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot(),
        PipesModule,
        AdminRoutingModule
    ],
    exports: [
        AdminComponent
    ],
})
export class AdminModule { }
