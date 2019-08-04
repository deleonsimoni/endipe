import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalInscricaoComponent } from '../modal-inscricao/modal-inscricao.component';
import { ModalEixoComponent } from '../modal-eixo/modal-eixo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  subscriptionType: string;
  subscriptionValue: number;

  instituicoes = [
    'Universidade Federal do Rio de Janeiro - UFRJ',
    'Universidade Federal do Estado do Rio de Janeiro - UNIRIO',
    'Universidade Estadual do Rio de Janeiro - UERJ',
    'Universidade Federal Fluminense - UFF',
    'Universidade Federal Rural do Rio de Janeiro - UFRRJ',
    // 'Universidade Católica de Petrópolis - UCP',
    // 'Universidade Estácio de Sá - ESTÁCIO',
    // 'Pontifícia Universidade Católica do Rio de Janeiro - PUC - Rio',
    // 'Instituto Superior de Educação do Rio de Janeiro - ISERJ',
    // 'Instituto Benjamim Constant - IBC',
    // 'Instituto Nacional de Educação de Surdos – INES'
  ];

  

  eixos = [
    {
      titulo: 'Eixo 1',
      tema: 'Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação com Formação docente',
      descricao: `Esse eixo temático prioriza as políticas de formação docente e os desafios de sua implementação,
      permanência e consolidação; concepções de formação de professores; formação centrada na escola e espaços colaborativos de formação;
      formação inicial e continuada; estágios curriculares e parcerias com as escolas; didáticas nos cursos de formação de professores;
      estratégias formativas e mediações didáticas; formação presencial, semipresencial e a distância; narrativas:
      investigação e formação de professores;
      metodologias e práticas curriculares de formação docente.`,
      coordenacao: [
        'Alexandra Garcia Ferreira Lima – UERJ FFP',
        'Graça Regina Reis – CAp UFRJ',
        'Monica Vasconcellos – UFF',
        'Victor Giraldo – UFRJ'
      ],
      pareceristas: [ ]
    },
    {
      titulo: 'Eixo 2',
      tema: 'Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação com Currículo e Avaliação',
      descricao: `Esse eixo temático prioriza os currículos e as avaliações nos contextos históricos e contemporâneos;
      políticas curriculares, as escolas e as salas de aula; culturas, conhecimentos e currículos; aprendizagens, currículos e avaliações;
      políticas de avaliação, as escolas e as salas de aula; culturas, conhecimentos e as diferentes dimensões da avaliação:
      políticas, sociais, pedagógicas e curriculares; metodologias e práticas curriculares e avaliativas.`,
      coordenacao: [
        'Maria Inês Marcondes – PUC-Rio',
        'Rosanne Evangelista Dias – UERJ',
        'Vania Finholdt Angelo Leite – FFP/UERJ'
      ],
      pareceristas: [ ]
    },
    {
      titulo: 'Eixo 3',
      tema: `Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação em Direitos Humanos,
       Interculturalidade e Religiões`,
      descricao: `Esse eixo temático prioriza as diferenças culturais que desafiam o cotidiano escolar;
      relações entre diferenças, direitos humanos e processos de ensino-aprendizagem; questões religiosas,
      interculturalidade e didática; articulação entre igualdade e diferença nas práticas pedagógicas,
      construindo processos educativos que questionam as lógicas dominantes e empoderem sujeitos subalternizados,
      seus saberes e práticas; metodologias e práticas curriculares em Direitos Humanos, Interculturalidade e Religiões.`,
      coordenacao: [
        'Ana Ivenicki – UFRJ',
        'Andrea Rosana Fetzener – UNIRIO',
        'Vera Maria Ferrão Candau – PUC-Rio'
      ],
      pareceristas: [ ]
    },
    {
      titulo: 'Eixo 4',
      tema: `Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre Novas epistemologias,
       Diferença, Biodiversidade, Democracia e Inclusão`,
      descricao: `Esse eixo temático prioriza produções que, de uma perspectiva insurgente,
      lançam mão de novas epistemologias para pensar as tensões e desafios educacionais no contexto atual;
      reflexões e pesquisas que apostam na potência de projetos e práticas cotidianas que assumem a tessitura da escola democrática
      como devir e como possibilidade; processo que só pode se viabilizar com e na diferença, no respeito mútuo, no cuidado de
      todas as formas de vida, não apenas a humana, e na valorização da alteridade, numa perspectiva inclusiva.`,
      coordenacao: [
        'Inês Barbosa de Oliveira – ESTÁCIO',
        'Marcia Pletsch – UFRRJ',
        'Talita Vidal Pereira – FEBEF/UERJ'
      ],
      pareceristas: [ ]
    },
    {
      titulo: 'Eixo 5',
      tema: `Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre Educação,
       Comunicação e Tecnologia`,
      descricao: `Esse eixo temático prioriza o debate sobre educar com as mídias, para as mídias e pelas mídias;
      imagens, literacias e linguagens multimodais nas práticas pedagógicas e na formação de professores;
      cinema e educação; a informática na educação: a didática e o pensamento computacional na escola básica
      e na formação de professores; potenciais das mídias digitais em rede para as didáticas e as práticas
      educativas nas múltiplas redes educativas; educação online: dos ambientes virtuais de aprendizagens às
      práticas de app-learning; educar em tempos de fake news, fazeressaberes didáticos; educação e Cibercultura;
      políticas de formação na interface Educação e Comunicação.`,
      coordenacao: [
        'Adriana Hoffman – UNIRIO',
        'Edméa Oliveira dos Santos – UFRRJ',
        'Walcea Barreto Alves – UFF'
      ],
      pareceristas: [ ]
    },
    {
      titulo: 'Eixo 6',
      tema: `Didáticas entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre Infâncias,
      Juventudes e Vida Adulta`,
      descricao: `Esse eixo temático prioriza as abordagens teóricas, metodológicas e epistemológicas sobre infâncias,
      juventudes e vida adulta e sua relação com a educação; políticas públicas de educação para bebês, crianças, jovens,
      adultos e idosos; perspectivas de futuro, garantia de direitos e vulnerabilidade das infâncias e juventudes pobres no Brasil;
      estudantes imigrantes e filhos de mulheres e adolescentes privadas de liberdade; insurgências nas práticas pedagógicas cotidianas;
      metodologias e práticas de ensino com crianças, jovens, adultos e idosos; conflitos nas relações intergeracionais;
      programas de governo, movimentos sociais e a sociedade civil nas ações educativas.`,
      coordenacao: [
        'Anelise Nascimento – UFRRJ',
        'Patricia Baroni – UFRJ',
        'Wânia Gonzalez – UNESA'
      ],
      pareceristas: [ ]
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }
        }
      }
    });

  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      // width: '250px',
      data: {subscriptionType: this.subscriptionType, subscriptionValue: this.subscriptionValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public openDialogEixo(eixo) {
    const dialogRef = this.dialog.open(ModalEixoComponent, {
      data: { item: eixo }
    });
  }
}
