import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { ShareDataService } from '../services/share-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // public token: String;
  public isAuth = false;
  // public isAuth = new Subject();

  constructor(
    private authService: AuthService,
    private share: ShareDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    const token = this.authService.getToken();
    if (token) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.verifyUser();

  }

  focusItem() {
    console.log('chamando');
  }

  verifyUser() {
    this.share.shareData.subscribe(data => {
      if (data) {
        this.isAuth = true;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isAuth = false;
    this.toastr.success('Esperamos que você volte logo.', 'Sucesso');
  }

}
