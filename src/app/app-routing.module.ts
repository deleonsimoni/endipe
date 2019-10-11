import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { SubmissaoComponent } from './submissao/submissao.component';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';
import { AdminComponent } from './admin/admin.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { RegisterCoordinatorComponent } from './register-coordinator/register-coordinator.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'esqueci-senha',
    component: EsqueciSenhaComponent
  },
  {
    path: 'reset-senha',
    component: ResetSenhaComponent
  },
  {
    path: 'register-coordinator',
    component: RegisterCoordinatorComponent
  },
  {
    path: 'pagamento',
    component: PagamentoComponent
  },
  {
    path: 'certificados',
    component: CertificadoComponent
  },
  {
    path: 'meus-trabalhos',
    component: TrabalhosComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'noticias',
    component: AdminNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
