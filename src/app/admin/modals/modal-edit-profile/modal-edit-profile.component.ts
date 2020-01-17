import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public modalidadesUsuario = [
    { id: 2, name: 'Mediador de roda de conversa' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 4, name: 'Mediador de minicurso' },
    { id: 5, name: 'Coordenador e/ou expositor de painel' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalEditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private adminService: AdminService
  ) {

    this.profileForm = this.builder.group({
      fullname: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      document: [null, [Validators.required]],
      institution: this.builder.group({
        name: [null, [Validators.required]],
        initials: [null]
      }),
      modalityId: new FormArray([])
    });

  }

  ngOnInit() {
    this.fillForm();
  }

  private fillForm() {
    if (!this.profileForm.get('_id')) {
      this.profileForm.addControl('_id', new FormControl(null));
    }
    this.profileForm.patchValue(this.data);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public get retrieveFormData() {
    return this.profileForm.getRawValue();
  }

  public updateUser() {
    const form = this.profileForm.getRawValue();

    this.adminService.updateUser(form)
      .subscribe(_ => {
        this.close();
      });
  }
}
