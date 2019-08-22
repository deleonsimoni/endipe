import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { ShareDataService } from '../services/share-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DownloadFileService } from '../services/download-file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private baixar: DownloadFileService,

    private share: ShareDataService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.loginForm = this.builder.group({
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit() {
  }

  public login() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
        .subscribe((res: any) => {
          this.authService.setUser(this.authService.getDecodedAccessToken(res.token), res.token);
          this.share.shareData.next(true);
          this.router.navigate(['home']);
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
        });
    }
  }

  private retrieveMyData() {
    this.authService.me()
      .subscribe(res => {
        console.log(res);
      });
  }

  public baixara() {
    this.baixar.getFile('a')
      .subscribe((res: any) => {
            
            /*var newBlob = new Blob([res.data], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = "Je kar.pdf";
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            setTimeout(function () {
                window.URL.revokeObjectURL(data);
                link.remove(); application/octet-stream
            }, 100);*/
            console.log('start download:', res);
             var blob = new Blob([res], { type: "application/pdf" } );
             saveAs(blob, 'oi.pdf');
            
      });
  }

  get validate() {
    return this.loginForm.controls;
  }
}
