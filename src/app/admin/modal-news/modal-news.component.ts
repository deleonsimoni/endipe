import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-news',
  templateUrl: './modal-news.component.html',
  styleUrls: ['./modal-news.component.scss']
})
export class ModalNewsComponent implements OnInit, OnDestroy {

  public newsForm: FormGroup;
  private noticiasUnsub$ = new Subject();

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalNewsComponent>,
    private noticiasService: NoticiasService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.noticiasUnsub$.next();
    this.noticiasUnsub$.complete();
  }

  private createForm() {
    this.newsForm = this.builder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public registerNotice() {
    if (this.newsForm.valid) {
      this.noticiasService.cadastrar(this.newsForm.value)
        .pipe(takeUntil(this.noticiasUnsub$))
        .subscribe((res: any) => {
          this.toastr.success('Noticia cadastrada com sucesso', 'Sucesso');
          this.close();
        }, err => {
          this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
        });
    }
  }

  get nameNotice() {
    return this.newsForm.get('name');
  }

  get descNotice() {
    return this.newsForm.get('description');
  }
}
