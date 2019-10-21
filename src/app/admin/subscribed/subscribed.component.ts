import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.scss']
})
export class SubscribedComponent implements OnInit {

  public users = [];
  public works = [];
  public allUsers = [];
  public infos = false;
  public carregandoTrabalhos = false;
  public search: string;
  public status: string;
  public carregando = false;
  public userSelect: number;
  public metrics: {};

  public modalities = [
    { id: 1, name: 'Convidado de sessão especial' },
    { id: 2, name: 'Mediador de roda de conversa' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 4, name: 'Mediador de minicurso' },
    { id: 5, name: 'Coordenador e/ou expositor de painel' },
    { id: 6, name: 'Simposista' },
    { id: 7, name: 'Ouvinte' }
  ];

  public eixos = [
    { id: 1, name: 'Formação docente' },
    { id: 2, name: 'Currículo e avaliação' },
    { id: 3, name: 'Direitos humanos, Interculturalidade e Religiões' },
    { id: 4, name: 'Nova epistemologia, Diferença, Biodiversidade, Democracia e Inclusão' },
    { id: 5, name: 'Educação, Comunicação e Técnologia' },
    { id: 6, name: 'Infâncias, Juventudes e Vida Adulta' }
  ];

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private authService: AuthService,
    private router: Router,
    private downloadService: DownloadFileService,
    private http: HttpClient,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    // this.retrieveMetrics();
    this.retrieveAdminData();
  }

  public receiverSelectedUser(user) {
    if (this.userSelect === user._id) {
      this.userSelect = null;
    } else {
      this.userSelect = user._id;
      if (user.works) {
        this.getUserWorks(user.works);
      }
    }
  }

  public retrieveMetrics() {
    this.adminService.recoverMetrics()
      .subscribe(metrics => this.metrics = metrics, err => console.log(err));
  }

  public getUserWorks(userWorksId) {
    this.works = [];
    this.carregandoTrabalhos = true;

    if (userWorksId) {
      userWorksId.forEach(workId => {
        this.http.get(`${this.baseUrl}/admin/getUserWorks/` + workId, {}).subscribe((res: any) => {
          this.carregandoTrabalhos = false;
          this.works.push(res);
        }, err => {
          this.carregandoTrabalhos = false;
          console.log(err);
        });
      });
    }

  }

  public download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
    this.downloadService.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  private retrieveAdminData() {
    this.authService.adminData()
      .subscribe((res: any[]) => {
        this.allUsers = res;
        this.users = res;
      });
  }

  public retrieveModality(id) {
    return this.modalities.filter(element => element.id === id)[0];
  }

  public retrieveEixo(id) {
    return this.eixos.filter(element => element.id === id)[0];
  }

  public searchUser() {
    if (this.search !== undefined && this.search !== '') {
      this.users = this.allUsers.filter(user => (user.document.match(this.search) || user.fullname.toLowerCase().match(this.search)));
    } else {
      this.users = this.allUsers;
    }
  }

  public filtrarStatus() {

    switch (Number(this.status)) {
      case 0:
        this.users = this.allUsers.filter(user => !user.payment);
        break;
      case 1:
        this.users = this.allUsers.filter(user => user.payment && user.payment.icPaid === false);
        break;
      case 2:
        this.users = this.allUsers.filter(user => user.payment && user.payment.icPaid === true);
        break;
      case 3:
        this.users = this.allUsers.filter(user => user.isPCD);
        break;

      default:
        this.users = this.allUsers;
        break;
    }
  }

  irParaNoticias() {
    this.router.navigate(['/noticias']);
  }

}
