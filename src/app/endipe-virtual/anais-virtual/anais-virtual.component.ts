import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';
import { MatDialog, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-anais-virtual',
  templateUrl: './anais-virtual.component.html',
  styleUrls: ['./anais-virtual.component.scss']
})
export class AnaisVirtualComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private anaisService: AnaisService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
  }

  public carregando = false;
  public anais = [];
  public sumario;

  ngOnInit() {
    this.listar();
  }


  public listar() {
    this.carregando = true;
    this.anaisService.listarVirtual()
      .subscribe((res: any) => {
        this.carregando = false;
        this.anais = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });
  }

  public listarSumario(anais) {
    this.carregando = true;
    this.anaisService.listarSumarioVirtual(anais._id)
    .subscribe((res: any) => {
      this.carregando = false;
      this.sumario = res;
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
    });
  }

}
