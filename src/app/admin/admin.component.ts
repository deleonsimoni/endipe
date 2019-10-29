import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

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

  user: any;
  menu: any[];

  private adminRoutes = [
    { name: 'INSCRITOS', path: '/admin/inscritos' },
    { name: 'NOTICÍAS', path: '/admin/noticias' },
    { name: 'COORDENADORES', path: '/admin/coordenadores' },
  ];

  private nonAdminRoutes = [
    { name: 'TRABALHOS', path: '/admin/trabalhos' },
  ];

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {
    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());

    if (this.user && this.user.icAdmin) {
      this.menu = this.adminRoutes;
    } else {
      this.menu = this.nonAdminRoutes;
    }
  }
}
