import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-modal-endipe-virtual',
  templateUrl: './modal-endipe-virtual.component.html',
  styleUrls: ['./modal-endipe-virtual.component.scss']
})
export class ModalEndipeVirtualComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEndipeVirtualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }


}
