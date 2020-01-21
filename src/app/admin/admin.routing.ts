import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SubscribedComponent } from './subscribed/subscribed.component';
import { NewsComponent } from './news/news.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { WorksComponent } from './works/works.component';
import { AdminGuard } from './admin.guard';
import { ConferencerComponent } from './conferencer/conferencer.component';
import { VincularTrabalhosComponent } from './vincular-trabalhos/vincular-trabalhos.component';
import { SchedulesComponent } from './schedules/schedules.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivateChild: [AdminGuard], children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'inscritos'
            },
            {
                path: 'inscritos', component: SubscribedComponent
            },
            {
                path: 'noticias', component: NewsComponent
            },
            {
                path: 'conferencistas', component: ConferencerComponent
            },
            {
                path: 'coordenadores', component: CoordinatorComponent
            },
            {
                path: 'vincular-trabalho', component: VincularTrabalhosComponent
            },
            {
                path: 'programacao', component: SchedulesComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
