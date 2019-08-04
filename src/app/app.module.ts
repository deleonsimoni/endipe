import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UtilNgxMaterialModule } from './util-ngx-material/util-ngx-material.module';
import { ModalInscricaoComponent } from './modal-inscricao/modal-inscricao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEixoComponent } from './modal-eixo/modal-eixo.component';
import { ModalProgramacaoComponent } from './modal-programacao/modal-programacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalInscricaoComponent,
    ModalEixoComponent,
    ModalProgramacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilNgxMaterialModule
  ],
  entryComponents: [
    ModalInscricaoComponent,
    ModalEixoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
