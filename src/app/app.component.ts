import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import $ from 'jquery';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AccordionComponent, AccordionPanelComponent } from 'ngx-bootstrap';
import { AuthService } from './services/auth.service';
import { ShareDataService } from './services/share-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('accordion', { static: false }) accordion: AccordionPanelComponent;

  title = 'endipe';
  isMobile: boolean;
  public isAuth = false;
  public user: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private share: ShareDataService,
    private toastr: ToastrService,
    private rota: Router,
    private auth: AuthService
  ) {

    this.breakpointObserver.observe(['(max-width: 992px)']).subscribe(res => {
      this.isMobile = res.matches;
    });

  }

  ngOnInit() {

    const token = this.authService.getToken();
    if (token) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());
    this.verifyUser();

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
    this.rota.navigate(['/home']);
  }

}
