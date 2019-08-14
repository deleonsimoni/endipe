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
import { NgxMaskModule } from 'ngx-mask';
import { InterceptorService } from './services/interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';
import { ListarTrabalhosComponent } from './listar-trabalhos/listar-trabalhos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
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
    ListarTrabalhosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilNgxMaterialModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  entryComponents: [
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
    ModalApoiadoresComponent,
    ModalCadastroSucessoComponent,
    RegisterComponent
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
