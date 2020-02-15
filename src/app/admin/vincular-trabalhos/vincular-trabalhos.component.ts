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

    switch (Number(this.status)) {
      case 0:
        this.works = this.allWorks;
        break;
      case 1:
        this.works = this.allWorks.filter(work => !work.reviewAdmin);
        break;
      case 2:
        this.works = this.allWorks.filter(work => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Não");
        break;
      case 3:
        this.works = this.allWorks.filter(work => work.reviewAdmin && work.reviewAdmin.review.icAllow == "Sim");
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
