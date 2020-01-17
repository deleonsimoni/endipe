import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ModalEditProfileComponent } from '../../modals/modal-edit-profile/modal-edit-profile.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'subscribers-data',
  templateUrl: './subscribers-data.component.html',
  styleUrls: ['./subscribers-data.component.scss']
})
export class SubscribersDataComponent implements OnInit {

  @Input() subscribed: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  public carregando = false;
  public carregandoTrabalhos = false;
  public works;

  constructor(
    private adminService: AdminService,
    private downloadService: DownloadFileService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.subscribed.works.length > 0) {
      this.userWorks(this.subscribed.works);
    }
  }

  validarComprovante(user) {

    this.http.post(`${this.baseUrl}/admin/validateDoc/` + user._id, {}).subscribe((res: any) => {
      user.payment.icValid = true;
    }, err => {
      console.log(err);
    });
  }

  invalidarComprovante(user) {
    this.http.post(`${this.baseUrl}/admin/invalidateDoc/` + user._id, {}).subscribe((res: any) => {
      user.payment.icValid = false;
    }, err => {
      console.log(err);
    });
  }

  public userWorks(userWorksId) {
    this.works = [];
    this.carregandoTrabalhos = true;

    if (userWorksId) {
      userWorksId.forEach(workId => {
        this.adminService.retrieveUserWorks(workId)
          .subscribe((res: any) => {
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

  public confirmPayment(user) {
    this.adminService.validatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = true;
      }, err => {
        console.log(err);
      });
  }

  public denyPayment(user) {
    this.adminService.invalidatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = false;
      }, err => {
        console.log(err);
      });
  }

  public retrieveModality(id) {
    return this.modalities.filter(element => element.id === id)[0];
  }

  public retrieveEixo(id) {
    return this.eixos.filter(element => element.id === id)[0];
  }

  public retrieveCategories(id) {
    return this.categories.filter(element => element.id === id)[0];
  }

  public editProfile() {
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      data: this.subscribed
    });

    dialogRef.afterClosed()
      .subscribe(_ => this.update.emit(true));
  }

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

  public categories = [
    { id: 1, name: 'Estudantes de curso Normal/EM' },
    { id: 2, name: 'Estudantes de Graduação' },
    { id: 3, name: 'Estudantes de Pós-Graduação' },
    { id: 4, name: 'Profissionais da Educação Básica' },
    { id: 5, name: 'Profissionais da Educação Superior' }
  ];


}
