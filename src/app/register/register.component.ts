import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { ModalNormasComponent } from '../modal-normas/modal-normas.component';
import { ModalCadastroSucessoComponent } from '../modal-cadastro-sucesso/modal-cadastro-sucesso.component';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public docType = 'Documento';
  public submit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private rota: Router,
    private share: ShareDataService
  ) {

    this.createForm();

  }

  ngOnInit() { }

  private createForm(): void {
    this.registerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfPassword: [null, [Validators.required, Validators.minLength(6)]],
      dateBirth: [null, [Validators.required]],
      icForeign: [false],
      document: [null, [Validators.required]],
      address: this.builder.group({
        street: [null, [Validators.required]],
        num: [null, [Validators.required]],
        complement: [null],
        zip: [null, [Validators.required]],
        city: [null, [Validators.required]],
        district: [null, [Validators.required]],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]]
      }),
      phones: this.builder.group({
        telephone: [null],
        cellphone: [null, [Validators.required]],
      }),
      institution: this.builder.group({
        name: [null, [Validators.required]],
        initials: [null]
      }),
      modalityId: [null],
      roles: this.builder.array([
        this.createGroup()
      ]),
      icAcceptTerms: [false]
    });
  }

  private createGroup(): FormGroup {
    return this.builder.group({
      id: [1, [Validators.required]],
      payment: this.builder.group({
        code: [null],
        amount: [null],
        icPaid: [null]
      })
    });
  }

  public register() {
    this.submit = true;
    const form = this.validatePassword();
    if (this.registerForm.valid && form != null) {
      this.authService.createUser(form)
        .subscribe((res: any) => {
          this.authService.setUser(this.authService.getDecodedAccessToken(res.token), res.token);
          this.share.shareData.next(true);
          this.exibirModalSucesso();
        }, err => console.log(err));
    }
    // this.exibirModalSucesso();
  }

  private validatePassword(): FormGroup {
    const form = this.registerForm.value;

    if (form.password === form.cfPassword) {

      this.registerForm.removeControl('cf-password');
      return this.registerForm.value;

    }

    return null;
  }

  private exibirModalSucesso(): void {

    const dialogRef = this.dialog.open(ModalCadastroSucessoComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rota.navigate(['/home']);
    });
  }

  public openRules(): void {
    const dialogRef = this.dialog.open(ModalNormasComponent, {
      data: {},
    });
  }

  get validate() {
    return this.registerForm.controls;
  }

  get phones() {
    return this.registerForm.get('phones');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get institution() {
    return this.registerForm.get('institution');
  }
}
