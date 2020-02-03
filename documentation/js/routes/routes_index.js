var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/admin/admin.routing.ts","module":"AdminRoutingModule","children":[{"path":"admin","component":"AdminComponent","canActivateChild":["AdminGuard"],"children":[{"path":"","pathMatch":"full","redirectTo":"inscritos"},{"path":"inscritos","component":"SubscribedComponent"},{"path":"noticias","component":"NewsComponent"},{"path":"conferencistas","component":"ConferencerComponent"},{"path":"coordenadores","component":"CoordinatorComponent"},{"path":"vincular-trabalho","component":"VincularTrabalhosComponent"},{"path":"programacao","component":"SchedulesComponent"}]}],"kind":"module"},{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","pathMatch":"full","redirectTo":"home"},{"path":"home","component":"HomeComponent"},{"path":"login","component":"LoginComponent"},{"path":"register","component":"RegisterComponent"},{"path":"esqueci-senha","component":"EsqueciSenhaComponent"},{"path":"reset-senha","component":"ResetSenhaComponent"},{"path":"pagamento","component":"PagamentoComponent"},{"path":"certificados","component":"CertificadoComponent"},{"path":"meus-trabalhos","component":"TrabalhosComponent"},{"path":"perfil","component":"PerfilComponent"}],"kind":"module"}]}
