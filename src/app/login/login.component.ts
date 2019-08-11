import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from "jwt-decode";
import { ShareDataService } from '../services/share-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private share: ShareDataService
  ) {

    this.loginForm = this.builder.group({
      email: [null],
      password: [null]
    });

  }

  ngOnInit() {
  }

  public login() {
    this.authService.loginUser(this.loginForm.value)
      .subscribe((res: any) => {
        this.authService.setUser(this.authService.getDecodedAccessToken(res.token), res.token);
        this.share.shareData.next(true);
      });
  }

  retrieveMyData() {
    this.authService.me()
      .subscribe(res => {
        console.log(res);
      });
  }

}
