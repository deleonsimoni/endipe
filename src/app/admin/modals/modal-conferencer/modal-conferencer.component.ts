import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-conferencer',
  templateUrl: './modal-conferencer.component.html',
  styleUrls: ['./modal-conferencer.component.scss']
})
export class ModalConferencerComponent implements OnInit {

  public conferencerForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<ModalConferencerComponent>,
    private builder: FormBuilder
  ) {

    this.conferencerForm = this.builder.group({
      name: [null],
      email: [null],
      description: [null],
      img: [null]
    });

  }

  ngOnInit() {
  }

  public saveConferencer() {
    console.log(this.conferencerForm.value);
  }

  public close() {
    this.dialog.close();
  }
}
