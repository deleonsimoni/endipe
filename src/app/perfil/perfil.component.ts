import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public userForm: FormGroup;
  public userData: any;
  public carregando = false;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {

    this.userForm = this.builder.group({
      fullname: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      dateBirth: [null, [Validators.required]],
      phones: this.builder.group({
        telephone: [null],
        cellphone: [null, [Validators.required]],
      }),
      address: this.builder.group({
        street: [null, [Validators.required]],
        num: [null, [Validators.required]],
        district: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        zip: [null, [Validators.required]]
      })
    });

  }

  ngOnInit() {
    this.userData = this.authService.getDecodedAccessToken(this.authService.getToken());
    this.fillForm();
  }

  private fillForm() {
    this.userForm.patchValue({
      fullname: this.userData.fullname,
      email: this.userData.email,
      dateBirth: this.userData.dateBirth,
      phones: this.userData.phones,
      address: this.userData.address
    });
  }

  public updateUser() {
    if (this.userForm.valid) {
      for (const key in this.userForm.value) {
        if (this.userForm.value.hasOwnProperty(key)) {
          this.userData[key] = this.userForm.value[key];
        }
      }

      if (!this.validarNome(this.userForm.value.fullname)) {
        this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
        return;
      }

      this.carregando = true;

      this.userService.updateData(this.userData)
        .subscribe(res => {
          this.toastr.success('Dados atualizados com sucesso.')
          this.carregando = false;
        });
    } else {
      this.toastr.error('Preencha os campos do formulário corretamente.', 'Erro: ');
    }
  }

  public validarNome(nome) {
    const regName = /^[a-zA-Z ]{6,30}$/;
    const name = nome;
    if (!regName.test(name)) {
      return false;
    } else {
      return true;
    }
  }

  get validate() {
    return this.userForm.controls;
  }

  get phones() {
    return this.userForm.get('phones')['controls'];
  }

  get address() {
    return this.userForm.get('address')['controls'];
  }

  get institution() {
    return this.userForm.get('institution')['controls'];
  }
}
