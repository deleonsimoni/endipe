import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';

@Component({
  selector: 'app-modal-anais',
  templateUrl: './modal-anais.component.html',
  styleUrls: ['./modal-anais.component.scss']
})
export class ModalAnaisComponent implements OnInit {

  public anaisForm: FormGroup;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAnaisComponent>,
    private anaisService: AnaisService,
    private toastr: ToastrService,
    @inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.anaisForm = this.builder.group({
      _id: [],
      name: [null, [Validators.required]],
      link: [null, [Validators.required]]
    });

    if (this.data.anal) {
      this.anaisForm.patchValue(this.data.anal);
    }

  }

  public close(): void {
    this.dialogRef.close();
  }

  public register() {
    this.submit = true;
    if (this.anaisForm.valid) {

      if (this.data.anal) {

        this.anaisService.atualizar(this.anaisForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Anais alterado com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao alterar', 'Atenção: ');
          });

      } else {
        this.anaisService.cadastrar(this.anaisForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Anais cadastrado com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    }
  }



}
