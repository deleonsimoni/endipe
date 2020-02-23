import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vincular-trabalhos',
  templateUrl: './vincular-trabalhos.component.html',
  styleUrls: ['./vincular-trabalhos.component.scss']
})
export class VincularTrabalhosComponent implements OnInit {

  public eixos = [
    { id: 1, name: 'Formação docente' },
    { id: 2, name: 'Currículo e avaliação' },
    { id: 3, name: 'Direitos humanos, Interculturalidade e Religiões' },
    { id: 4, name: 'Nova epistemologia, Diferença, Biodiversidade, Democracia e Inclusão' },
    { id: 5, name: 'Educação, Comunicação e Técnologia' },
    { id: 6, name: 'Infâncias, Juventudes e Vida Adulta' }
  ];
  public axisId = null;
  public works = [];
  public reviewers = [];
  public user;
  public workSelect;
  public status;
  public allWorks = [];
  public modalidadeFilter = 0;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    if (this.user.reviewer && this.user.reviewer.icCoordinator) {
      this.axisId = this.user.reviewer.icModalityId;
      this.loadData();
    }
  }

  public filtrarStatus() {
    this.modalidadeFilter = 0;
    if (this.user.icAdmin) {
      this.filtraStatusAdmin();
    } else {
      this.filtraStatusCoordenador();
    }

  }

  filtrarModalidade() {

    switch (Number(this.modalidadeFilter)) {
      case 0:
        if (this.status) {
          this.works = this.works;
        } else {
          this.works = this.allWorks;
        }
        break;
      case 2:
        this.works = this.works.filter(work => work.modalityId == 2);
        break;
      case 3:
        this.works = this.works.filter(work => work.modalityId == 3);
        break;
      case 4:
        this.works = this.works.filter(work => work.modalityId == 4);
        break;
      case 5:
        this.works = this.works.filter(work => work.modalityId == 5);
        break;
    }

  }


  filtraStatusAdmin() {

    switch (Number(this.status)) {
      case 0:
        this.works = this.allWorks;
        break;
      case 1:
        this.works = this.allWorks.filter(work => !work.reviewAdmin);
        break;
      case 2:
        this.works = this.allWorks.filter(work => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Nao");
        break;
      case 3:
        this.works = this.allWorks.filter(work => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim");
        break;
    }

  }

  filtraStatusCoordenador() {

    switch (Number(this.status)) {
      case 0:
        this.works = this.allWorks;
        break;
      case 1:
        this.works = this.allWorks.filter(work => !work.reviewReviewer);
        break;
      case 2:
        this.works = this.allWorks.filter(work => work.reviewReviewer && work.reviewReviewer.review.icAllow == "Nao");
        break;
      case 3:
        this.works = this.allWorks.filter(work => work.reviewReviewer && work.reviewReviewer.review.icAllow == "Sim");
        break;
    }

  }

  loadData() {

    this.adminService.retrieveReviewers(this.axisId)
      .subscribe(res => {
        if (res.temErro) {
          this.toastr.error('Erro', res);
        } else {
          this.loadWorks();
          this.reviewers = res.reviewers;
        }
      });
  }

  loadWorks() {
    this.adminService.retrieveAllWorks(this.axisId)
      .subscribe(res => {
        if (res.temErro) {
          this.toastr.error('Erro', res);
        } else {

          this.allWorks = res;
          this.works = this.allWorks
        }
      });

  }

  public receiverSelectedWork(work) {
    if (this.workSelect === work._id) {
      this.workSelect = null;
    } else {
      this.workSelect = work._id;
    }
  }


}
