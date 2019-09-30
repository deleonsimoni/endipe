import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-news',
  templateUrl: './modal-news.component.html',
  styleUrls: ['./modal-news.component.scss']
})
export class ModalNewsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
