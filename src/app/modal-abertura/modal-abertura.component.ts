import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';

@Component({
  selector: 'app-modal-abertura',
  templateUrl: './modal-abertura.component.html',
  styleUrls: ['./modal-abertura.component.scss']
})
export class ModalAberturaComponent implements OnInit {

  public programacao;

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.programacao = this.data.item;
  }

  public close() {
    this.dialogRef.close();
  }

}
