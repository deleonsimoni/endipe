export const MODALITIES = [
    { id: 1, name: 'Convidado de sessão especial' },
    { id: 2, name: 'Mediador de roda de conversa' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 4, name: 'Mediador de minicurso' },
    { id: 5, name: 'Coordenador e/ou expositor de painel' },
    { id: 6, name: 'Simposista' },
    { id: 7, name: 'Ouvinte' }
];

export const AXIS = [
    { id: 1, name: 'Formação docente' },
    { id: 2, name: 'Currículo e avaliação' },
    { id: 3, name: 'Direitos humanos, Interculturalidade e Religiões' },
    { id: 4, name: 'Nova epistemologia, Diferença, Biodiversidade, Democracia e Inclusão' },
    { id: 5, name: 'Educação, Comunicação e Técnologia' },
    { id: 6, name: 'Infâncias, Juventudes e Vida Adulta' }
];

export const WORK_OPTIONS = [
    { id: 1, name: 'Pôster' },
    { id: 2, name: 'Painel' },
    { id: 3, name: 'Minicurso' },
    { id: 4, name: 'Roda de conversa' }
];

export const PROGRAMACOES = [
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
            },
            {
                tema: 'II - DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO COM ',
                tipo: 'CURRÍCULO E AVALIAÇÃO',
                palestras: [
                    {
                        classificacao: 'SIMPÓSIO A',
                        tema: 'Políticas de Currículo e Avaliação para a Educação Básica: quais caminhos?',
                        coordenadores: [
                            'Sandra Zakia (USP)',
                            'Alice Casimiro Lopes (UERJ)',
                            'Alicia Bonamino (PUC-Rio)',
                            'Coord. Lenilda Faria (UFAcre)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO B',
                        tema: 'Por uma relação outra entre Didática, Currículo, Avaliação e qualidade da Educação Básica',
                        coordenadores: [
                            'Luiz Carlos de Freitas(UNICAMP)',
                            'Marcia Serra Ferreira(UFRJ)',
                            'Claudia Fernandes(UNIRIO)',
                            'Coord.Suzana dos Santos Gomes(UFMG)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO C',
                        tema: 'Diálogos entre Didática, Currículo e Avaliação no cotidiano escolar: perspectivas insurgentes',
                        coordenadores: [
                            'Guilherme Alcantara (UFMG)',
                            'Walkiria Rigolon (SEE/SP)',
                            'Maria Teresa Esteban (UFF)',
                            'Coord. Tatiana Fagundes (SME-Rio / FME-Niterói)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO D',
                        tema: 'Didática e Docência no Ensino Superior: reinvenções curriculares e avaliativas',
                        coordenadores: [
                            'Maria Isabel de Almeida (USP)',
                            'Gustavo Fischman (Arizona State University)',
                            'Sandra Regina Soares (UNEB)',
                            'Coord. Marcia Maria e Silva (UFF)'
                        ],
                        horario: '',
                        local: ''
                    }
                ]
            },
            {
                tema: 'III- DIDÁTICA(S) ENTRE DIÁLOGOS, INSURGÊNCIAS E POLÍTICAS: TENSÕES E PERSPECTIVAS NA RELAÇÃO EM ',
                tipo: 'DIREITOS HUMANOS, INTRERCULTURALIDADE E RELIGIÕES',
                palestras: [
                    {
                        classificacao: 'SIMPÓSIO A',
                        tema: 'Os desafios das pautas da educação em/para os direitos humanos nas salas de aula da educação básica e do ensino superior',
                        coordenadores: [
                            'Aída Maria Monteiro Silva (UFPE)',
                            'Paulo Cesar Carbonari (IFIBE)',
                            'Daniela Azini Henrique (SME-Rio)',
                            'Coord. Daniela Valentim (UERJ)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO B',
                        tema: 'As culturas religiosas e a laicidade das escolas públicas: possibilidades e desafios às práticas de ensino',
                        coordenadores: [
                            'Andréia Martins(UFPI)',
                            'Roseli Fischemann(USP)',
                            'Maristela Gomes de Souza Guedes(UERJ)',
                            'Coord.Pedro Pinheiro Teixeira(PUC - Rio)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO C',
                        tema: 'Interculturalidade e perspectivas insurgentes: diálogos entre universidade, escola e movimentos sociais',
                        coordenadores: [
                            'Reinaldo Matias Fleuri(UFSC)',
                            'Andréa Borges de Medeiros(SME / JF)',
                            'Susana Sacavino(Novamerica)',
                            'Coord.Ana Ivenicki(UFRJ)'
                        ],
                        horario: '',
                        local: ''
                    },
                    {
                        classificacao: 'SIMPÓSIO D',
                        tema: 'Racismo, Antirracismo e Educação: desafios ao campo da Didática e da Prática de Ensino',
                        coordenadores: [
                            'Lia Vainer Schucman(UFSC)',
                            'Givânia Silva(UnB / CONAQ)',
                            'Roberto Carlos da Silva Borges(CEFET / RJ)',
                            'Coord.Claudia Miranda(UNIRIO)'
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
    {
        titulo: 'Encerramento',
        data: '17/7',
        horario: '15:30-19:00',
        local: '',
        sessao: [
            {
                titulo: '– Conferência de Encerramento',
                horario: '15:30'
            },
            {
                titulo: '– Apresentação cultural',
                horario: '     '
            },
            {
                titulo: '– Escolha do local de sede do XXI ENDIPE 2022',
                horario: '     '
            }
        ],
        coordenadores: [
            'Antònio Nóvoa (ULisboa/PT – UFRJ)',
            'Mediadora: Tatiana Roque (FCC/UFF)'
        ]
    },
];
