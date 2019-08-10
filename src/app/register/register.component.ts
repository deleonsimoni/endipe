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

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private rota: Router

  ) {

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
      })

    });

  }

  ngOnInit() {
  }

  public register(): void {
    this.registerForm.removeControl('cf-password');
    if (this.registerForm.valid) {
      this.registerForm.value.dateBirth = new Date();
      this.authService.createUser(this.registerForm.value)
        .subscribe((res) => {
          this.exibirModalSucesso();
        },
        (err) => {
          console.log(err);
        });
    }
  }

  private exibirModalSucesso(): void {

    const dialogRef = this.dialog.open(ModalCadastroSucessoComponent, {
      data: {  },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rota.navigate(['/home']);
    });
  }

  public openRules(): void {
    const dialogRef = this.dialog.open(ModalNormasComponent, {
      data: {  },
    });
  }

}
