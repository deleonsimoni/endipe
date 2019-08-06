import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UtilNgxMaterialModule } from './util-ngx-material/util-ngx-material.module';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModalEixoComponent } from './modal-eixo/modal-eixo.component';
import { ModalProgramacaoComponent } from './modal-programacao/modal-programacao.component';
import { ModalNormasComponent } from './modal-normas/modal-normas.component';
import { ModalApoiadoresComponent } from './modal-apoiadores/modal-apoiadores.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
    ModalApoiadoresComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilNgxMaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent,
    ModalNormasComponent,
    ModalApoiadoresComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: environment.host
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
