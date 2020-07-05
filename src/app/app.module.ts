import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UtilNgxMaterialModule } from './util-ngx-material/util-ngx-material.module';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalEixoComponent } from './modal-eixo/modal-eixo.component';
import { ModalProgramacaoComponent } from './modal-programacao/modal-programacao.component';
import { ModalNormasComponent } from './modal-normas/modal-normas.component';
import { ModalNormasMinicursoComponent } from './modal-normas/modal-mediador-minu-curso.component';
import { ModalNormasRodaConversaComponent } from './modal-normas/modal-mediador-conversa.component';
import { ModalNormasPainelComponent } from './modal-normas/modal-expositor-painel.component';
import { ModalNormasPosterComponent } from './modal-normas/modal-expositor-poster.component';

import { ModalApoiadoresComponent } from './modal-apoiadores/modal-apoiadores.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { SubmissaoComponent } from './submissao/submissao.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { ModalCadastroSucessoComponent } from './modal-cadastro-sucesso/modal-cadastro-sucesso.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { InterceptorService } from './services/interceptor.service';
import { OwlModule } from 'ngx-owl-carousel';
import { ToastrModule } from 'ngx-toastr';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';
import { ListarTrabalhosComponent } from './listar-trabalhos/listar-trabalhos.component';
import { AccordionModule } from 'ngx-bootstrap';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminModule } from './admin/admin.module';
import { PipesModule } from './pipes/pipes.module';
import { AdminRoutingModule } from './admin/admin.routing';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { QuillModule } from 'ngx-quill';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { ModalSessoesEspeciaisComponent } from './modal-sessoes-especiais/modal-sessoes-especiais.component';
import { ModalSimposioComponent } from './modal-simposio/modal-simposio.component';
import { ModalHospedagemComponent } from './modal-hospedagem/modal-hospedagem.component';
import { ModalTransporteComponent } from './modal-transporte/modal-transporte.component';
import { ModalAlimentacaoComponent } from './modal-alimentacao/modal-alimentacao.component';
import { ModalTurismoComponent } from './modal-turismo/modal-turismo.component';
import { ModalConferencistasComponent } from './modal-conferencistas/modal-conferencistas.component';
import { ModalEncerramentoComponent } from './modal-encerramento/modal-encerramento.component';
import { ModalAberturaComponent } from './modal-abertura/modal-abertura.component';
import { GlobalComponentsModule } from './components/global-components.module';
import { ProgramacaoModule } from './programacao/programacao.module';
import { HomeVirtualComponent } from './endipe-virtual/home-virtual/home-virtual.component';
import { MeuEndipeComponent } from './meu-endipe/meu-endipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
    ModalNormasMinicursoComponent,
    ModalNormasRodaConversaComponent,
    ModalNormasPainelComponent,
    ModalNormasPosterComponent,
    ModalApoiadoresComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    PagamentoComponent,
    SubmissaoComponent,
    CertificadoComponent,
    ModalCadastroSucessoComponent,
    TrabalhosComponent,
    ListarTrabalhosComponent,
    PerfilComponent,
    EsqueciSenhaComponent,
    ResetSenhaComponent,
    ModalSessoesEspeciaisComponent,
    ModalSimposioComponent,
    ModalHospedagemComponent,
    ModalTransporteComponent,
    ModalAlimentacaoComponent,
    ModalTurismoComponent,
    ModalConferencistasComponent,
    ModalEncerramentoComponent,
    ModalAberturaComponent,
    HomeVirtualComponent,
    MeuEndipeComponent,

  ],
  imports: [
    BrowserModule,
    OwlModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminRoutingModule,
    UtilNgxMaterialModule,
    HttpClientModule,
    QuillModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),
    AdminModule,
    ProgramacaoModule,
    GlobalComponentsModule,
    PipesModule
  ],
  entryComponents: [
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
    ModalNormasMinicursoComponent,
    ModalNormasRodaConversaComponent,
    ModalNormasPainelComponent,
    ModalNormasPosterComponent,
    ModalApoiadoresComponent,
    ModalCadastroSucessoComponent,
    RegisterComponent,
    ModalSessoesEspeciaisComponent,
    ModalSimposioComponent,
    ModalHospedagemComponent,
    ModalAlimentacaoComponent,
    ModalTransporteComponent,
    ModalTurismoComponent,
    ModalConferencistasComponent,
    ModalEncerramentoComponent,
    ModalAberturaComponent,
    RegisterComponent,

  ],
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: environment.host
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
