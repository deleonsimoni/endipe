import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { ModalNormasComponent } from '../modal-normas/modal-normas.component';
import { ModalCadastroSucessoComponent } from '../modal-cadastro-sucesso/modal-cadastro-sucesso.component';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public docType = 'Documento';

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private rota: Router
  ) {

    this.createForm();

  }

  ngOnInit() {
  }

  private createForm(): void {
    this.registerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.min(6)]],
      cfPassword: [null, [Validators.required, Validators.min(6)]],
      dateBirth: [null, [Validators.required]],
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
    console.log(this.registerForm.value);
    const form = this.validatePassword();
    if (this.registerForm.valid && form != null) {
      this.authService.createUser(form)
        .subscribe(_ => this.exibirModalSucesso(), err => console.log(err));
    }
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

}
