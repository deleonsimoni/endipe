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
  inscricoes: any;
  coringa = '';
  exibirGT = false;
  certificados = [];
  templateAutomatico = { target: { value: '' } };

  ngOnInit() {
    this.carregando = true;
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;

      this.nome = this.user.fullname;

      if (!this.user.icAdmin) {
        if (this.user.payment && this.user.payment.icPaid) {
          this.templateAutomatico.target.value = 'PARTICIPAÇÃO GERAL';
          this.preencherTemplate(this.templateAutomatico, null, null);
        }
        if (this.user.works && this.user.works.length > 0) {
          this.carregarTrabalhosUsuario();
        }
        if (this.user.cursosInscritos && this.user.cursosInscritos.length > 0) {
          this.carregarInscricoes();
        }
      } else {
        this.carregando = false;
      }

    });

  }


  private gerarCertificadosTrabalhos() {
    this.works.forEach(work => {
      //MiniCurso
      if (work.modalityId == 4 && work.reviewAdmin && work.reviewAdmin.review.icAllow == 'Sim' ||
        (work.reviewReviewer &&
          work.reviewReviewer.review &&
          work.reviewReviewer.review.icAllow != 'Não')) {

        this.templateAutomatico.target.value = 'MEDIAÇÃO DE MINICURSO';
        this.preencherTemplate(this.templateAutomatico, work.title, 'xx');

      }

      if (work.modalityId == 2 && work.reviewAdmin && work.reviewAdmin.review.icAllow == 'Sim' ||
        (work.reviewReviewer &&
          work.reviewReviewer.review &&
          work.reviewReviewer.review.icAllow != 'Não')) {

        this.templateAutomatico.target.value = 'MEDIAÇÃO DE RODA DE CONVERSA';
        this.preencherTemplate(this.templateAutomatico, work.title, null);

      }

      if (work.modalityId == 5 && work.reviewAdmin && work.reviewAdmin.review.icAllow == 'Sim' ||
        (work.reviewReviewer &&
          work.reviewReviewer.review &&
          work.reviewReviewer.review.icAllow != 'Não')) {

        this.templateAutomatico.target.value = 'PAINEL';
        this.preencherTemplate(this.templateAutomatico, work.title, null);

      }

      if (work.modalityId == 3 && work.reviewAdmin && work.reviewAdmin.review.icAllow == 'Sim' ||
        (work.reviewReviewer &&
          work.reviewReviewer.review &&
          work.reviewReviewer.review.icAllow != 'Não')) {

        this.templateAutomatico.target.value = 'PÔSTER';
        this.preencherTemplate(this.templateAutomatico, work.title, null);

      }
    });
  }

  private gerarCertificadosInscricoes() {
    let control = 0;
    this.inscricoes.forEach(work => {
      if (this.user.cursosInscritos[control].icModalityId == 4) {
        this.templateAutomatico.target.value = 'PARTICIPAÇÃO DE MINICURSO';
        this.preencherTemplate(this.templateAutomatico, work.workTitle, 'xx');
      } else if (this.user.cursosInscritos[control].icModalityId == 2) {
        this.templateAutomatico.target.value = 'PARTICIPAÇÃO DE RODA DE CONVERSA';
        this.preencherTemplate(this.templateAutomatico, work.workTitle, null);
      }
      control++;
    });
  }

  private carregarTrabalhosUsuario() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/user/worksReviewer/`).subscribe((res: any) => {
      this.works = res.works;
      this.gerarCertificadosTrabalhos();
      this.carregando = false;
    }, err => {
      console.log(err);
      this.carregando = false;
    });
  }

  private carregarInscricoes() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/user/getWorksIncricoes?inscricoes=` + JSON.stringify(this.user.cursosInscritos)).subscribe((res: any) => {
      this.inscricoes = res.works;
      this.gerarCertificadosInscricoes();
      this.carregando = false;
    }, err => {
      console.log(err);
      this.carregando = false;
    });
  }

  public captureScreen(index) {
    this.carregando = true;

    let data = document.getElementById('certificado' + index);

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

  preencherTemplate(templateSelecionado, complementoUm, complementoDois) {

    if (this.user.icAdmin) {
      this.certificados = [];
    }
    this.exibirGT = false;
    this.coringa = '';
    this.textoTemplate = this.templates.filter(element => element.name == templateSelecionado.target.value)[0].value;
    if (templateSelecionado.target.value == 'GT') {
      this.coringa = " participou do GT ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'PRESTAÇÃO DE SERVIÇO') {
      this.coringa = " atuou como prestadora de serviço na área de ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'COORDENAÇÃO DE ATIVIDADE') {
      this.coringa = "coordenou ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'SESSÃO ESPECIAL') {
      this.coringa = " integrou a Sessão Especial " + (complementoUm || '______________') + " com a palestra " + (complementoDois || '_______ ');
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'ATIVIDADE CULTURAL') {
      this.coringa = " realizou a apresentação cultural ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'MEDIAÇÃO DE MINICURSO') {
      if (this.user.icAdmin) {
        this.coringa = " desenvolveu o Minicurso " + (complementoUm || '______________') + " com carga horária de " + (complementoDois || '_______ ') + ' horas';
      } else {
        this.coringa = " desenvolveu o Minicurso " + complementoUm;
      }
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'PARTICIPAÇÃO DE MINICURSO') {
      if (this.user.icAdmin) {
        this.coringa = " participou do Minicurso " + (complementoUm || '______________') + " com carga horária de " + (complementoDois || '_______ ') + ' horas';
      } else {
        this.coringa = " participou do Minicurso " + complementoUm;
      }
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'MEDIAÇÃO DE RODA DE CONVERSA') {
      this.coringa = " fez a mediação da Roda de Conversa " + (complementoUm || '______________');
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'PARTICIPAÇÃO DE RODA DE CONVERSA') {
      this.coringa = " participou da Roda de Conversa " + complementoUm || '______________' + " ";
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'PAINEL') {
      this.coringa = " apresentou o Painel intitulado " + (complementoUm || '______________');
      this.exibirGT = true;
    } else if (templateSelecionado.target.value == 'PÔSTER') {
      this.coringa = " apresentou o trabalho " + (complementoUm || '______________');
      this.exibirGT = true;
    }

    this.certificados.push({ nome: this.nome, coringa: this.coringa, textoTemplate: this.textoTemplate })

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
      value: "no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
    },
    {
      name: 'PARTICIPAÇÃO DE MINICURSO',
      value: "no XX Encontro Nacional de Didática e Prática de Ensino – XX ENDIPE – RIO 2020 – uma promoção interinstitucional coordenada pela Universidade Federal do Rio de Janeiro, no período 29 de outubro a 01 de novembro de 2020."
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