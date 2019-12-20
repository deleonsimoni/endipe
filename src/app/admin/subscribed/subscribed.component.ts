import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { AdminService } from '../admin.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.scss']
})
export class SubscribedComponent implements OnInit {

  public user: any = {};
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

  constructor(
    private authService: AuthService,
    private downloadService: DownloadFileService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

    if (this.user && !this.user.icAdmin) {
      this.retrieveWorks(this.user.coordinator || this.user.reviewer)
        .subscribe(res => {
          //console.log(res);
        });
    } else {
      this.retrieveAdminData();
    }

  }

  private retrieveWorks(id): Observable<any> {
    return this.adminService.retrieveAllWorks(id)
      .pipe(
        map(res => res)
      );
  }

  private retrieveAdminData() {
    this.adminService.retrieveUsers()
      .subscribe((res: any[]) => {
        //console.log(res);
        this.allUsers = res;
        this.users = res;
      });
  }

  public receiverSelectedUser(user) {
    if (this.userSelect === user._id) {
      this.userSelect = null;
    } else {
      this.userSelect = user._id;
      if (user.works) {
        this.userWorks(user.works);
      }
    }
  }

  public retrieveMetrics() {
    this.adminService.recoverMetrics()
      .subscribe(metrics => this.metrics = metrics, err => console.log(err));
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
        this.users = this.allUsers.filter(user => user.payment && (user.payment.pathS3 || user.payment.pathReceiptPayment)
          && (!user.payment.icValid || user.payment.icValid === false)
          && user.payment.icPaid === false);
        break;
      case 2:
        this.users = this.allUsers.filter(user => user.payment && user.payment.pathReceiptPayment
          && user.payment.icValid === true
          && user.payment.icPaid === false);
        break;
      case 3:
        this.users = this.allUsers.filter(user => user.isPCD);
        break;
      case 4:
        this.users = this.allUsers.filter(user => user.works.length > 0);
        break;
      case 5:
        this.users = this.allUsers.filter(user => user.payment && user.payment.icPaid === true);
        break;
      default:
        this.users = this.allUsers;
        break;
    }
  }

}
