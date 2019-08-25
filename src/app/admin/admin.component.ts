import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { DownloadFileService } from '../services/download-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('showInfos', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-in', style({
        opacity: 1
      }))),
      transition('* => void', animate('300ms ease-out', style({
        opacity: 0
      })))
    ])
  ]
})
export class AdminComponent implements OnInit {

  public users = [];
  public infos = false;
  public modalities = [
    { id: 1, name: 'Convidado de sessão especial' },
    { id: 2, name: 'Mediador de roda de conversa' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 4, name: 'Mediador de minicurso' },
    { id: 5, name: 'Coordenador e expositor de painel' },
    { id: 6, name: 'Simposista' },
    { id: 7, name: 'Ouvinte' }
  ];

  public categories = [
    { id: 1, name: 'Estudantes de curso Normal/EM' },
    { id: 2, name: 'Estudantes de Graduação' },
    { id: 3, name: 'Estudantes de Pós-Graduação' },
    { id: 4, name: 'Profissionais da Educação Básica' },
    { id: 5, name: 'Profissionais da Educação Superior' }
  ];

  carregando = false;
  userSelect: number;

  constructor(
    private authService: AuthService,
    private downloadService: DownloadFileService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.retrieveAdminData();
  }

  validarPagamento(user) {

    this.http.post(`${this.baseUrl}/admin/validatePayment/` + user._id, {}).subscribe((res: any) => {
      user.payment.icPaid = true;
    }, err => {
      console.log(err);
    });
  }

  invalidarPagamento(user) {
    this.http.post(`${this.baseUrl}/admin/invalidatePayment/` + user._id, {}).subscribe((res: any) => {
      user.payment.icPaid = false;
    }, err => {
      console.log(err);
    });
  }

  selectUser(user) {

    if (this.userSelect === user) {
      this.userSelect = null;
    } else {
      this.userSelect = user;
    }


  }

  download(nameFile) {
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
        this.users = res;
        console.log(this.users);
      });
  }

  retrieveModality(id) {
    return this.modalities.filter(element => element.id === id)[0];
  }

  retrieveCategories(id) {
    return this.categories.filter(element => element.id === id)[0];
  }
}