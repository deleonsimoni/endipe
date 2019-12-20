import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalInscricaoComponent } from '../modal-inscricao/modal-inscricao.component';
import { ModalEixoComponent } from '../modal-eixo/modal-eixo.component';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { ModalNormasComponent } from '../modal-normas/modal-normas.component';
import { ModalApoiadoresComponent } from '../modal-apoiadores/modal-apoiadores.component';
import { ModalNormasRodaConversaComponent } from '../modal-normas/modal-mediador-conversa.component';
import { ModalNormasPainelComponent } from '../modal-normas/modal-expositor-painel.component';
import { ModalNormasMinicursoComponent } from '../modal-normas/modal-mediador-minu-curso.component';
import { ModalNormasPosterComponent } from '../modal-normas/modal-expositor-poster.component';
import { DownloadFileService } from '../services/download-file.service';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from '../services/noticias.service';
import { ModalSessoesEspeciaisComponent } from '../modal-sessoes-especiais/modal-sessoes-especiais.component';
import { ModalSimposioComponent } from '../modal-simposio/modal-simposio.component';
import { ModalHospedagemComponent } from '../modal-hospedagem/modal-hospedagem.component';
import { ModalAlimentacaoComponent } from '../modal-alimentacao/modal-alimentacao.component';
import { ModalTransporteComponent } from '../modal-transporte/modal-transporte.component';
import { ModalTurismoComponent } from '../modal-turismo/modal-turismo.component';
import { ModalConferencistasComponent } from '../modal-conferencistas/modal-conferencistas.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  subscriptionType: string;
  subscriptionValue: number;
  carregando = false;
  noticias = [];

  configuracaoCarrossel = {
    nav: true,
    slideBy: 2,
    margin: 14,
    responsive: {
      '0': { items: 1, margin: 5 },
      '940': { items: 3, margin: 5 }
    }
  };

  instituicoes = [
    'Universidade Federal do Rio de Janeiro – UFRJ',
    'Universidade Federal do Estado do Rio de Janeiro – UNIRIO',
    'Universidade Federal Fluminense – UFF',
    'Universidade Federal Rural do Rio de Janeiro – UFRRJ',
    'Universidade do Estado do Rio de Janeiro – UERJ',
    'Universidade Estácio de Sá – UNESA',
    'Universidade Católica de Petrópolis – UCP',
    'Pontifícia Universidade Católica do Rio de Janeiro – PUC-Rio',
    'Instituto Benjamim Constant – IBC',
    'Instituto Nacional de Educação de Surdos – INES',
    'Instituto Superior de Educação do Rio de Janeiro – ISERJ'
  ];

  coordenacoesGerais = [
    'Andrea Fetzner – UNIRIO',
    'Antonio Flavio Barbosa Moreira – UCP',
    'Carmen Teresa Gabriel – UFRJ',
    'Claudia de Oliveira Fernandes – UNIRIO',
    'Giseli Barreto da Cruz – UFRJ',
    'Graça Regina Reis – EB/Cap-UFRJ',
    'Inês Barbosa de Oliveira – UNESA',
    'Maria Inês Marcondes – PUC-Rio',
    'Naiara Miranda Rust – IBC',
    'Rosanne Evangelista Dias – UERJ',
    'Vera Maria Ferrão Candau – PUC-Rio',
    'Yrlla Ribeiro de Oliveira Carneiro da Silva – INES'
  ];

  imagensApoiadores = [
    './assets/img/parceiros/ufrj2.png',
    './assets/img/parceiros/unirio.png',
    './assets/img/parceiros/ufrrj.png',
    './assets/img/parceiros/uff.png',
    './assets/img/parceiros/uerj.png',
    './assets/img/parceiros/ucp.png',
    './assets/img/parceiros/puc.png',
    './assets/img/parceiros/iserj.png',
    './assets/img/parceiros/ines.png',
    './assets/img/parceiros/febf.png',
    './assets/img/parceiros/estacio.png',
    './assets/img/parceiros/assb.png',
  ];

  imagensParcerias = [
    './assets/img/parcerias/CAPES.png',
    './assets/img/parcerias/cnpq.png',
    './assets/img/parcerias/Faculdade de Educação.jpg',
    './assets/img/parcerias/faperj.png',
    './assets/img/parcerias/FEBF.png',
    './assets/img/parcerias/FUJB.png',
    './assets/img/parcerias/UCP.jpg',
    './assets/img/parcerias/UERJ_LOGO_COR_TP.png',
    './assets/img/parcerias/UFRJ.png'
  ];

  comites = [
    'Andrea Vilella Mafra da Silva – ISERJ',
    'Antonio Flavio Barbosa Moreira – UCP',
    'Claudia de Oliveira Fernandes – UNIRIO',
    'Claudia Miranda – UNIRIO',
    'Débora Barreiros – UERJ',
    'Edméa Oliveira dos Santos – UFRRJ',
    'Giseli Barreto da Cruz – UFRJ',
    'Inês Barbosa de Oliveira – UNESA',
    'Luis Paulo Cruz Borges – EB/CAp-UERJ',
    'Maria das Graças Nascimento – UFRJ',
    'Maria Inês Marcondes – PUC-Rio',
    'Monica Vasconcellos – UFF',
    'Naiara Miranda Rust – IBC',
    'Patricia Bastos de Azevedo – UFRRJ',
    'Sandra Maciel – UFF',
    'Talita Vidal – FEBF/UERJ',
    'Vania Finholdt Angelo Leite – FFP/UERJ',
    'Vera Maria Ferrão Candau – PUC-Rio',
    'Yrlla Ribeiro de Oliveira Carneiro da Silva – INES'
  ];

  secretarias = [
    'Silvana Mesquita – PUC-Rio',
    'Helena Fontoura – FFP/UERJ',
    'Talita da Silva Campelo – EB/SME-Caxias'
  ];

  gruposDeTrabalho = [
    {
      nome: 'Apoio aos preletores',
      equipe: [
        'Patricia Bastos de Azevedo – UFRRJ (coord.)',
        'Pâmella Esteves – FFP/UERJ',
        'Pedro Pinheiro Teixeira – PUC-Rio',
        'Priscila Monteiro Corrêa – FEBF/UERJ',
        'Talita da Silva Campelo – EB/SME-Caxias',
        'Viviane Lontra – EB/CAp-UFRJ'
      ]
    },
    {
      nome: 'Arte e comunicação',
      equipe: [
        'Edméa Oliveira Santos – UFRRJ (coord.)',
        'Silvana Mesquita – PUC-Rio (coord.)',
        'Daniele Grazinolli – UFRJ',
        'Felipe da Silva Ferreira – EB/CEFET-RJ',
        'Fernanda Lahtermaher Oliveira – EB/CAp UFRJ',
        'Rosemary dos Santos Oliveira – FEBF/UERJ',
        'Bosco Mesquita (design gráfico)'
      ]
    },
    {
      nome: 'Atividades culturais',
      equipe: [
        'Sandra Maciel – UFF (coord.)',
        'Adrianne Ogeda – UNIRIO',
        'Cristiane Oliveira – EB/CPII',
        'Dagmar Melo Silva – UFF',
        'Flavia Barreto – FFP/UERJ',
        'Juliana Manhães – UNIRIO',
        'Lea Tiriba – UNIRIO',
        'Lucia Cavalieri – UFF',
        'Monique Andries Nogueira – UFRJ',
        'Silvia Soter – UFRJ',
        'Tatiana Bezerra Fagundes – EB/SME-Rio e FME-Niterói',
        'Wilson Cardoso Júnior – UFRJ'
      ]
    },
    {
      nome: 'Gestão financeira',
      equipe: [
        'Giseli Barreto da Cruz – UFRJ (coord.)',
        'Elizabeth Macedo – UERJ',
        'Maria das Graças Nascimento – UFRJ',
        'Vera Maria Ferrão Candau – PUC-Rio'
      ]
    },
    {
      nome: 'Hospedagem, transporte e alimentação',
      equipe: [
        'Talita Vidal – FEBF/UERJ (coord.)',
        'Rafaela Vilela – EB/EEI-UFRJ'
      ]
    },
    {
      nome: 'Inclusão e acessibilidade',
      equipe: [
        'Bianca Della Libera – IBC (coord.)',
        'Yrlla Ribeiro de Oliveira Carneiro da Silva – INES (coord)',
        'Adriana do Carmo Corrêa Gonçalves – FEBF/UERJ',
        'Érika Souza Leme – UFF',
        'Flavia Faissal de Souza – FEBF/UERJ',
        'Helenice Maia – UNESA',
        'Heloisa Carrero – FFP/UERJ',
        'Luciana Pires Alves – FEBF/UERJ',
        'Patricia Santos – FFP/UERJ',
        'Rejane Maria de Almeida – UFRJ',
        'Thania Nhary – FFP/UERJ'
      ]
    },
    {
      nome: 'Local e infraestrutura',
      equipe: [
        'Claudia de Oliveira Fernandes – UNIRIO (coord.)',
        'Andrea Villela Mafra da Silva – ISERJ (coord.)',
        'Ana Teresa de Carvalho Corrêa de Oliveira – UFRJ',
        'Crizan Sasson Oliveira – EB/CAp-UERJ',
        'Luis Paulo Braga – IBC',
        'Maria de Fátima da Silva – EB/FME-Niterói',
        'Nizia Ponte – ISERJ'
      ]
    },
    {
      nome: 'Material do congressista',
      equipe: [
        'Vania Finholdt Angelo Leite – FFP/UERJ (coord.)',
        'Alice Akemi Yamasaki – UFF',
        'Cristina Spolidoro Freund – EB/CPII',
        'Dinah Terra – UFF',
        'Giselle Martins dos Santos Ferreira – PUC-Rio',
        'Guilherme Augusto Rezende Lemos – UERJ'
      ]
    },
    {
      nome: 'Programação',
      equipe: [
        'Luís Paulo Borges – EB/CAp UERJ (coord.)',
        'Adriana Patrício Delgado – UFRJ',
        'Bonier Axer – EB/CAp-UERJ',
        'Daniela Frida Drelich Valentim – UERJ',
        'Isabel Martins – UFRJ',
        'Jacqueline Moraes – FFP/UERJ',
        'Lea Tiriba – UNIRIO',
        'Ludmila Thomé de Andrade – UFRJ',
        'Luiza Alves de Oliveira – UFRRJ'
      ]
    },
    {
      nome: 'Relação com as redes de ensino',
      equipe: [
        'Claudia Miranda – UNIRIO (coord.)',
        'Maria das Graças Nascimento – UFRJ (coord.)',
        'Alexandra Garcia – FFP/UERJ',
        'Elana Cristiana Costa – EB/FME-Niterói',
        'Marcella da Silva Estevez Pacheco Guedes – FEBF/UERJ',
        'Marize Peixoto da Silva Figueiredo – FEBF/UERJ',
        'Monica dos Santos Toledo – EB/COLUNI/UFF',
        'Patricia Coelho da Costa – PUC-Rio',
        'Rejany dos Santos Dominick – UFF',
        'Veronica Borges de Oliveira – UERJ'
      ]
    },
    {
      nome: 'Serviço de monitoria e recepção',
      equipe: [
        'Cecília Silvano Batalha – EB/FME-Niterói (coord.)',
        'Aline Crispin – EB/EEI-UFRJ',
        'Daniela de Oliveira Guimarães – UFRJ',
        'Erika Souza Leme – UFF',
        'Magda Piscolleta – PUC-Rio'
      ]
    },
    {
      nome: 'Serviço de som, filmagem, imagem, transmissão e tecnologia',
      equipe: [
        'Monica Vasconcellos – UFF (coord.)',
        'Edna Regina Aguiar – EB/COLUNI/UFF',
        'Helen Pereira Ferreira – UFF',
        'Marcia Maria e Silva – UFF',
        'Priscila Andrade Rodrigues – UFRJ',
        'Sonia Mendes – UNESA'
      ]
    },
    {
      nome: 'Sistema de inscrição e secretaria',
      equipe: [
        'Silvana Mesquita – PUC-Rio (coord.)',
        'Helena Amaral Fontoura – FFP/UERJ (coord.)',
        'Talita da Silva Campelo – EB/SME-Caxias',
        'Débora Barreiros – UERJ',
        'Rita de Cássia Prazeres Frangella – UERJ',
        'Rita Vilanova Prata – UFRJ',
        'Rosalva Drummond – EB/CAp-ISERJ'
      ]
    }
  ];

  eixos = [
    {
      titulo: 'Eixo 1',
      tema: 'Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação com <span class="red" id="red">Formação docente</span>',
      temaCurto: 'com Formação docente',
      descricao: `Esse eixo temático prioriza as políticas de formação docente e os desafios de sua implementação,
      permanência e consolidação; concepções de formação de professores; formação centrada na escola e espaços colaborativos de formação;
      formação inicial e continuada; estágios curriculares e parcerias com as escolas; didáticas nos cursos de formação de professores;
      estratégias formativas e mediações didáticas; formação presencial, semipresencial e a distância; narrativas:
      investigação e formação de professores;
      metodologias e práticas curriculares de formação docente.`,
      coordenacao: [
        'Alexandra Garcia Ferreira Lima – FFP/UERJ',
        'Graça Regina Reis – CAp UFRJ',
        'Monica Vasconcellos – UFF',
        'Naiara Miranda Rust – IBC',
        'Victor Giraldo – UFRJ'
      ],
      pareceristas: []
    },
    {
      titulo: 'Eixo 2',
      tema: 'Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação com <span class="red" id="red">Currículo e Avaliação</span>',
      temaCurto: 'com Currículo e Avaliação',
      descricao: `Esse eixo temático prioriza os currículos e as avaliações nos contextos históricos e contemporâneos;
      políticas curriculares, as escolas e as salas de aula; culturas, conhecimentos e currículos; aprendizagens, currículos e avaliações;
      políticas de avaliação, as escolas e as salas de aula; culturas, conhecimentos e as diferentes dimensões da avaliação:
      políticas, sociais, pedagógicas e curriculares; metodologias e práticas curriculares e avaliativas.`,
      coordenacao: [
        'Maria Inês Marcondes – PUC-Rio',
        'Rosanne Evangelista Dias – UERJ',
        'Vania Finholdt Angelo Leite – FFP/UERJ'
      ],
      pareceristas: []
    },
    {
      titulo: 'Eixo 3',
      tema: `Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação em <span class="red" id="red">Direitos Humanos,
       Interculturalidade e Religiões</span>`,
      temaCurto: `em Direitos Humanos, Interculturalidade e Religiões`,
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
      pareceristas: []
    },
    {
      titulo: 'Eixo 4',
      tema: `Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre <span class="red" id="red">Novas epistemologias,
       Diferença, Biodiversidade, Democracia e Inclusão</span>`,
      temaCurto: `entre Novas epistemologias, Diferença, Biodiversidade, Democracia e Inclusão`,
      descricao: `Esse eixo temático prioriza produções que, de uma perspectiva insurgente,
      lançam mão de novas epistemologias para pensar as tensões e desafios educacionais no contexto atual;
      reflexões e pesquisas que apostam na potência de projetos e práticas cotidianas que assumem a tessitura da escola democrática
      como devir e como possibilidade; processo que só pode se viabilizar com e na diferença, no respeito mútuo, no cuidado de
      todas as formas de vida, não apenas a humana, e na valorização da alteridade, numa perspectiva inclusiva.`,
      coordenacao: [
        'Inês Barbosa de Oliveira – UNESA',
        'Marcia Pletsch – UFRRJ',
        'Talita Vidal Pereira – FEBF/UERJ',
        'Yrlla Ribeiro de Oliveira Carneiro da Silva – INES'
      ],
      pareceristas: []
    },
    {
      titulo: 'Eixo 5',
      tema: `Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre <span class="red" id="red">Educação,
       Comunicação e Tecnologia</span>`,
      temaCurto: `entre Educação, Comunicação e Tecnologia`,
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
      pareceristas: []
    },
    {
      titulo: 'Eixo 6',
      tema: `Didática(s) entre diálogos, insurgências e políticas: tensões e perspectivas na relação entre <span class="red" id="red">Infâncias,
      Juventudes e Vida Adulta</span>`,
      temaCurto: `entre Infâncias, Juventudes e Vida Adulta`,
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
      pareceristas: []
    }
  ];

  programacoes = [
    {
      titulo: 'Abertura',
      horarios: []
    },
    {
      titulo: 'Atividades Culturais',
      horarios: []
    },
    {
      titulo: 'Minicursos',
      horarios: []
    },
    {
      titulo: 'Rodas de Conversa',
      horarios: []
    },
    {
      titulo: 'Simpósios',
      simposios: [
        {
          tema: 'I- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM ',
          tipo: 'FORMAÇÃO DOCENTE',
          palestras: [
            {
              classificacao: 'SIMPÓSIO A',
              tema: 'Didática, Prática de Ensino e políticas de formação docente: projetos, dilemas e (re)invenções',
              coordenadores: [
                'Luiz Fernandes Dourado(UFG)',
                'Dalila Andrade Oliveira(UFMG)',
                'Carmen Teresa Gabriel(UFRJ)',
                'Coord.Magali Silvestre(UNIFESP)'
              ],
              horario: '',
              local: ''
            },
            {
              classificacao: 'SIMPÓSIO B',
              tema: 'Movimentos insurgentes na formação docente: propostas, resistências e (re)existências',
              coordenadores: [
                'Patricia Cristina Albieri de Almeida (FCC)',
                'Elizeu Clementino de Souza (UNEB)',
                'Luiz Fernandes de Oliveira (UFRRJ)',
                'Coord. Nilson de Souza Cardoso (UECE/FORPIBID)'
              ],
              horario: '',
              local: ''
            },
            {
              classificacao: 'SIMPÓSIO C',
              tema: 'Estágio, PIBID e Residência Pedagógica: convergências ou disputas por práticas de formação?',
              coordenadores: [
                'Flavia Medeiros Sarti (UNESP)',
                'Isabel Maria Sabino (UECE)',
                'Andrea Rosana Fetzner (UNIRIO)',
                'Coord. Cristina Spolidoro Freund (CPII)'
              ],
              horario: '',
              local: ''
            },
            {
              classificacao: 'SIMPÓSIO D',
              tema: 'Prática de Ensino e suas implicações para a inserção profissional docente: desafios ao desenvolvimento profissional',
              coordenadores: [
                'Maria do Céu Roldão (UCPorto/PT)',
                'Marli André (PUC-SP)',
                'Morgana Rezende (SME-Rio)',
                'Coord. Maria das Graças Nascimento (UFRJ)'
              ],
              horario: '',
              local: ''
            }
          ]
        }
      ]
    },
    {
      titulo: 'Painéis',
      horarios: []
    },
    {
      titulo: 'Pôsteres',
      horarios: []
    },
    {
      titulo: 'Sessões especiais',
      sessoes: [
        {
          data: '15/7',
          horario: '18:00-20:00',
          palestras: [
            {
              tema: 'A reinvenção do campo da Didática no Brasil',
              coordenadores: [
                'Vera Candau (PUC-Rio)',
                'Aída Monteiro (UFPE)',
                'Leda Sheibe (UFSC)',
                'Mediação: Vania Leite (UERJ/FFP)'
              ],
              local: ''
            },
            {
              tema: 'Didática, Escola e a luta democrática',
              coordenadores: [
                'José Carlos Libâneo(UFG)',
                'Selma Garrido Pimenta(USP)',
                'Lilian Anna Wachowicz / Pura Martins / Joana Romanowisk(PUC / PR)',
                'Mediação: Silvana Mesquita(PUC - Rio)'
              ],
              local: ''
            },
            {
              tema: 'Didática, Currículo e Formação de Professores: relações históricas e emancipadoras – Uma conversa',
              coordenadores: [
                'Ilma Passos Alencastro Veiga (UnB)',
                'Nilda Alves (UERJ)',
                'Menga Lüdke (PUC-Rio)',
                'Mediação: Helena Fontoura (UERJ/FFP)'
              ],
              local: ''
            }
          ]
        },
        {
          data: '16/7',
          horario: '18:00-20:00',
          palestras: [
            {
              tema: 'Didática, Formação e Trabalho Docente: relações com o Conhecimento',
              coordenadores: [
                'Maria Isabel da Cunha (UNISINOS)',
                'Julio Diniz-Pereira / Lucíola Santos / Angela Dalben (UFMG)',
                'Alda Marin (PUC/SP)',
                'Mediação: Monica Vasconcellos (UFF)'
              ],
              local: ''
            },
            {
              tema: 'Didática e Prática de Ensino: desafios políticos da atualidade',
              coordenadores: [
                'Maria do Socorro Lucena (UECE)',
                'Silas Borges Monteiro (UFMT)',
                'Cristina D’Avila (UFBA)',
                'Mediação: Priscila Rodrigues (UFRJ)'
              ],
              local: ''
            },
            {
              tema: 'Didática, Currículo e Formação de Professores: relações históricas e emancipadoras – Outra conversa ',
              coordenadores: [
                'Maria Rita Neto Sales Oliveira (CEFET/MG)',
                'Antonio Flavio Moreira (UCP)',
                'Bernardete Gatti (FFC)',
                'Mediação: Isabel Alice Lelis (PUC-Rio)'
              ],
              local: ''
            }
          ]
        }
      ]
    },
    {
      titulo: 'Lançamentos de Livros',
      horarios: []
    },
    {
      titulo: 'Reuniões de Entidades e de Redes',
      horarios: []
    },
    {
      titulo: 'Conferencistas',
      horarios: []
    },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private download: DownloadFileService,
    private noticiasService: NoticiasService,
    private toastr: ToastrService,

  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }
    });

  }

  ngOnInit() {

    this.listarNoticias();

  }


  public listarNoticias() {
    this.noticiasService.listar()
      .subscribe((res: any) => {
        this.noticias = res;
      }, err => {
        this.toastr.error('Ocorreu um erro ao listar noticias', 'Atenção: ');
      });
  }

  downloadTemplate(nameFile) {
    const vm = this;

    function sucessoDownload() {
      vm.carregando = false;
    }

    function falhaDownload(err) {
      if (err.status === 401) {
        vm.toastr.error('Você precisa estar logado para fazer o download', 'Atenção: ');
      } else {
        vm.toastr.error('Erro ao relizar download. Tente novamente mais tarde', 'Erro: ');
      }
      console.log(err);
      vm.carregando = false;
    }

    this.carregando = true;
    this.download.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInscricaoComponent, {
      // width: '250px',
      data: { subscriptionType: this.subscriptionType, subscriptionValue: this.subscriptionValue }
    });

    dialogRef.afterClosed().subscribe();
  }

  public openDialogEixo(eixo) {
    const dialogRef = this.dialog.open(ModalEixoComponent, {
      data: { item: eixo }
    });
  }

  public openDialogProgramacao(programacao) {
    console.log(programacao.titulo);
    switch (programacao.titulo) {
      case 'Sessões especiais':
        this.dialog.open(ModalSessoesEspeciaisComponent, {
          data: { item: programacao }
        });
        break;

      case 'Simpósios':
        this.dialog.open(ModalSimposioComponent, {
          data: { item: programacao }
        });
        break;

      case 'Conferencistas':
        this.dialog.open(ModalConferencistasComponent);
        break;

      default:
        this.dialog.open(ModalProgramacaoComponent, {
          data: { item: programacao }
        });
        break;
    }
  }

  public openDialogHospedagem() {
    const dialogRef = this.dialog.open(ModalHospedagemComponent);
  }

  public openDialogAlimentacao() {
    const dialogRef = this.dialog.open(ModalAlimentacaoComponent);
  }

  public openDialogTransporte() {
    const dialogRef = this.dialog.open(ModalTransporteComponent);
  }

  public openDialogTurismo() {
    const dialogRef = this.dialog.open(ModalTurismoComponent);
  }

  public openDialogNormas() {
    const dialogRef = this.dialog.open(ModalNormasComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogMinicurso() {
    const dialogRef = this.dialog.open(ModalNormasMinicursoComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogPainel() {
    const dialogRef = this.dialog.open(ModalNormasPainelComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogRoda() {
    const dialogRef = this.dialog.open(ModalNormasRodaConversaComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogPoster() {
    const dialogRef = this.dialog.open(ModalNormasPosterComponent, {
      data: {},
      height: '550vh'
    });
  }

  public openDialogApoiadores(apoiadores, imagens) {
    const dialogRef = this.dialog.open(ModalApoiadoresComponent, {
      data: { item: apoiadores, imagensApoiadores: imagens },
      height: '550vh'
    });
  }
}
