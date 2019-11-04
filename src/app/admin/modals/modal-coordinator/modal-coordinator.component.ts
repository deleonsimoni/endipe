import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { ModalEixoComponent } from 'src/app/modal-eixo/modal-eixo.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modal-coordinator',
  templateUrl: './modal-coordinator.component.html',
  styleUrls: ['./modal-coordinator.component.scss']
})
export class ModalCoordinatorComponent implements OnInit {

  public coordinatorForm: FormGroup;
  public submit = false;
  public eixos = [
    { id: 1, name: 'Eixo 1' },
    { id: 2, name: 'Eixo 2' },
    { id: 3, name: 'Eixo 3' },
    { id: 4, name: 'Eixo 4' },
    { id: 5, name: 'Eixo 5' },
    { id: 6, name: 'Eixo 6' }
  ];

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalEixoComponent>,
    private adminService: AdminService
  ) {

    this.coordinatorForm = this.builder.group({
      axis: [null, [Validators.required]],
      authors: this.builder.array([
        this.createFields()
      ])
    });

    this.coordinatorForm.get('axis').valueChanges.subscribe(res => {
      const control = this.coordinatorForm.get('authors') as FormArray;
      this.submit = false;
      for (let i = control.length - 1; i >= 0; i--) {
        if (i === 0) {
          (this.coordinatorForm.get('authors') as FormArray).at(0).patchValue({ email: '' });
        } else {
          control.removeAt(i);
        }
      }
    });

  }

  ngOnInit() {
  }

  private createFields() {
    return this.builder.group({
      email: [null, [Validators.required]]
    });
  }

  public addAuthors() {
    const authors = this.coordinatorForm.get('authors') as FormArray;
    authors.push(this.createFields());
  }

  public close() {
    this.dialogRef.close();
  }

  public saveCoordinator(): void {
    this.submit = true;
    if (this.coordinatorForm.valid) {
      this.adminService.registerCoordinator(this.coordinatorForm.value)
        .subscribe(({ coordinators }: any) => {
          if (coordinators.temErro) {
            this.toastr.error(coordinators.mensagem);
          } else {
            this.close();
          }
        });
    } else {
      this.toastr.error('Preencha todos os campos');
    }
  }

  get axis() {
    return this.coordinatorForm.get('axis');
  }

  get authors() {
    return this.coordinatorForm.get('authors');
  }

}
