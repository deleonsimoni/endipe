import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-reviewer',
  templateUrl: './modal-reviewer.component.html',
  styleUrls: ['./modal-reviewer.component.scss']
})
export class ModalReviewerComponent implements OnInit {

  public eixos = [
    { id: 1, name: 'Eixo 1' },
    { id: 2, name: 'Eixo 2' },
    { id: 3, name: 'Eixo 3' },
    { id: 4, name: 'Eixo 4' },
    { id: 5, name: 'Eixo 5' },
    { id: 6, name: 'Eixo 6' }
  ];
  public reviewerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ModalReviewerComponent>
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.reviewerForm = this.builder.group({
      axis: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public registerReviewer() {
    console.log(this.reviewerForm.value);
  }
}
