import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { SubmissaoComponent } from './submissao/submissao.component';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { ProgramacaoComponent } from './programacao/programacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/programacao'
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
    path: 'programacao',
    component: ProgramacaoComponent
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
    path: 'perfil',
    component: PerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
