'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">endipe documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-0dd72dc8a1082386a57fc176ea763af4"' : 'data-target="#xs-components-links-module-AdminModule-0dd72dc8a1082386a57fc176ea763af4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-0dd72dc8a1082386a57fc176ea763af4"' :
                                            'id="xs-components-links-module-AdminModule-0dd72dc8a1082386a57fc176ea763af4"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConferencerCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConferencerCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConferencerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConferencerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoordinatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CoordinatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScheduleCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchedulesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SchedulesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubscribedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribersCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubscribersCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribersDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubscribersDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribersMetricsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubscribersMetricsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VincularTrabalhosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VincularTrabalhosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2ce3d84d795fc65e93127f84b81b61ba"' : 'data-target="#xs-components-links-module-AppModule-2ce3d84d795fc65e93127f84b81b61ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2ce3d84d795fc65e93127f84b81b61ba"' :
                                            'id="xs-components-links-module-AppModule-2ce3d84d795fc65e93127f84b81b61ba"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CertificadoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CertificadoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EsqueciSenhaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EsqueciSenhaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListarTrabalhosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListarTrabalhosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalAberturaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalAberturaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalAlimentacaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalAlimentacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalApoiadoresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalApoiadoresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalCadastroSucessoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalCadastroSucessoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalConferencistasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalConferencistasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEixoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEixoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEncerramentoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEncerramentoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalHospedagemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalHospedagemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalInscricaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalInscricaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNormasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNormasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNormasMinicursoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNormasMinicursoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNormasPainelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNormasPainelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNormasPosterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNormasPosterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNormasRodaConversaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNormasRodaConversaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalProgramacaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalProgramacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSessoesEspeciaisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalSessoesEspeciaisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSimposioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalSimposioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalTransporteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalTransporteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalTurismoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalTurismoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PagamentoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PagamentoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetSenhaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetSenhaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmissaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmissaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrabalhosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrabalhosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModalModule.html" data-type="entity-link">ModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalModule-5d7ee3a96606b0e5c1dfcaf09f81160d"' : 'data-target="#xs-components-links-module-ModalModule-5d7ee3a96606b0e5c1dfcaf09f81160d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalModule-5d7ee3a96606b0e5c1dfcaf09f81160d"' :
                                            'id="xs-components-links-module-ModalModule-5d7ee3a96606b0e5c1dfcaf09f81160d"' }>
                                            <li class="link">
                                                <a href="components/ModalConferencerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalConferencerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalCoordinatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalCoordinatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalNewsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalNewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalReviewAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalReviewAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalReviewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalReviewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalSchedulesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalSchedulesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-869e49cfb6b357789f38eba4f4595b1c"' : 'data-target="#xs-pipes-links-module-PipesModule-869e49cfb6b357789f38eba4f4595b1c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-869e49cfb6b357789f38eba4f4595b1c"' :
                                            'id="xs-pipes-links-module-PipesModule-869e49cfb6b357789f38eba4f4595b1c"' }>
                                            <li class="link">
                                                <a href="pipes/AxisPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AxisPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/DocPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MaskCpfPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaskCpfPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ModalitiesPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalitiesPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TypeWorkPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TypeWorkPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilNgxMaterialModule.html" data-type="entity-link">UtilNgxMaterialModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link">AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CertificadoService.html" data-type="entity-link">CertificadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConferencistaService.html" data-type="entity-link">ConferencistaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoordinatorService.html" data-type="entity-link">CoordinatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadFileService.html" data-type="entity-link">DownloadFileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NoticiasService.html" data-type="entity-link">NoticiasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicService.html" data-type="entity-link">PublicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link">ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShareDataService.html" data-type="entity-link">ShareDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/InterceptorService.html" data-type="entity-link">InterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link">DialogData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});