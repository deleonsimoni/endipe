import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';
import { MatDialog } from '@angular/material';
import { ModalNewsComponent } from '../modals/modal-news/modal-news.component';

@Component({
  selector: 'app-anais',
  templateUrl: './anais.component.html',
  styleUrls: ['./anais.component.scss']
})
export class AnaisComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private anaisService: AnaisService,
    private dialog: MatDialog,
  ) {
  }

  public carregando = false;
  public anais = [];

  ngOnInit() {
    this.listar();
  }


  public listar() {
    this.carregando = true;
    this.anaisService.listar()
      .subscribe((res: any) => {
        this.carregando = false;
        this.anais = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });
  }

  public deletar(anais) {
    this.carregando = true;
    this.anaisService.deletar(anais)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Anais excluído com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao excluir', 'Atenção: ');
      });
  }

  public register() {
    const dialogRef = this.dialog.open(ModalNewsComponent);

    dialogRef.afterClosed().subscribe(() => this.listar());
  }

  public update(anal) {
    const dialogRef = this.dialog.open(ModalNewsComponent, {
      data: {
        anal: anal
      }
    });
    dialogRef.afterClosed().subscribe(() => this.listar());
  }



}
