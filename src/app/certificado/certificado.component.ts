import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CertificadoService } from './certificado.service';

import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';
import * as jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {

  }

  user: any;
  carregando = false;
  nome: any;
  gt: any;
  textoTemplate: any;
  works: any;

  ngOnInit() {
    this.carregando = true;
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;

      this.nome = this.user.fullname;

      if (this.user.works && this.user.works.length > 0) {
        this.carregarTrabalhosUsuario();

      }

      /*if (this.user.payment && this.user.payment.icPaid) {
        this.templateSelecionado = this.templates.filter(element => element.name == 'PARTICIPAÇÃO GERAL')[0]
      }
*/

      this.carregando = false;
    });


  }

  private carregarTrabalhosUsuario() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/user/worksReviewer/`).subscribe((res: any) => {
      this.works = res.works;
      this.carregando = false;
    }, err => {
      console.log(err);
      this.carregando = false;
    });
  }

  public captureScreen() {
    this.carregando = true;

    let data = document.getElementById('certificado');

    html2canvas(data).then(canvas => {
      let imgWidth = 300;
      let imgHeight = 190;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      this.carregando = false;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Certificado Endipe.pdf'); // Generated PDF
    });

  }

  preencherTemplate(templateSelecionado) {
    this.textoTemplate = this.templates.filter(element => element.name == templateSelecionado.target.value)[0].value;
  }

  templates = [
    {
      name: 'COORDENAÇÃO GERAL',
      value: "coordenou o XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período de 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'COMITÊ ORGANIZADOR',
      value: "participou do Comitê Organizador do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'GT',
      value: "do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'COMITÊ CIENTÍFICO',
      value: "fez parte do Comitê Científico do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PARECERISTA',
      value: "participou na condição de parecerista do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PRESTAÇÃO DE SERVIÇO',
      value: "para fins de realização do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'MONITORIA',
      value: "atuou como monitora no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'COORDENAÇÃO DE ATIVIDADE',
      value: "do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'SESSÃO ESPECIAL',
      value: "no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'ATIVIDADE CULTURAL',
      value: "realizou a apresentação cultural no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, , no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PARTICIPAÇÃO GERAL',
      value: "participou do XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'MEDIAÇÃO DE MINICURSO',
      value: "horas, no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PARTICIPAÇÃO DE MINICURSO',
      value: "horas, no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'MEDIAÇÃO DE RODA DE CONVERSA',
      value: "no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PARTICIPAÇÃO DE RODA DE CONVERSA',
      value: " no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PAINEL',
      value: "no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, realizado no Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PÔSTER',
      value: "na modalidade Pôster, durante o XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    }
  ];

}