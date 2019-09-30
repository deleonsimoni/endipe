import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from 'src/app/services/noticias.service';
import { MatDialog } from '@angular/material';
import { ModalNewsComponent } from '../modal-news/modal-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public newsForm: FormGroup;
  public carregando = false;
  public noticias = [];

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private noticiasService: NoticiasService,
    private dialog: MatDialog,
  ) {

    this.createForm();

  }

  ngOnInit() {

    this.listar();

  }

  private createForm(): void {
    this.newsForm = this.builder.group({
      name: [null, [Validators.required]]
    });
  }

  public cadastrar() {
    this.carregando = true;
    this.noticiasService.cadastrar(this.newsForm.value)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Noticia cadastrada com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
      });
  }

  public deletar(news) {
    this.carregando = true;
    this.noticiasService.deletar(news)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Noticia excluída com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao excluir', 'Atenção: ');
      });
  }

  public listar() {
    this.carregando = true;
    this.noticiasService.listar()
      .subscribe((res: any) => {
        this.carregando = false;
        this.noticias = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar noticias', 'Atenção: ');
      });
  }

  public register() {
    const dialogRef = this.dialog.open(ModalNewsComponent);

    dialogRef.afterClosed().subscribe();
  }

  get validate() {
    return this.newsForm.controls;
  }

}
