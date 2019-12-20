import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-conferencistas',
  templateUrl: './modal-conferencistas.component.html',
  styleUrls: ['./modal-conferencistas.component.scss']
})
export class ModalConferencistasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalConferencistasComponent>,

  ) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

}
