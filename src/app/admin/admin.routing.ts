import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SubscribedComponent } from './subscribed/subscribed.component';
import { NewsComponent } from './news/news.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, children: [
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
                path: 'coordenadores', component: RegisterCoordinatorComponent
            },
            {
                path: 'pareceristas', component: RegisterCoordinatorComponent
            }
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
