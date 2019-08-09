import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from "node_modules/jw";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
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

        this.authService.setUser(this.authService.getDecodedAccessToken(res.token),res.token);
        //localStorage.setItem('token', res.token);
        /*setTimeout(() => {
          this.authService.me()
            .subscribe(res => {
              console.log(res);
            });
        }, 500);*/
      });
  }

  retrieveMyData() {
    this.authService.me()
      .subscribe(res => {
        console.log(res);
      });
  }

}
