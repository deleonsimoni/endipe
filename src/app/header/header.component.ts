import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public token: String;
  public isAuth: Boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.token = this.authService.getToken();
    this.token == null ? this.isAuth = false : this.isAuth = true;

  }

}
