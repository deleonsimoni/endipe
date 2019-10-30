import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-reviewer',
  templateUrl: './modal-reviewer.component.html',
  styleUrls: ['./modal-reviewer.component.scss']
})
export class ModalReviewerComponent implements OnInit {

  public reviewerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ModalReviewerComponent>,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {

    this.reviewerForm = this.builder.group({
      reviewers: this.builder.array([
        this.createFields()
      ])
    });

  }

  ngOnInit() { }

  private createFields(): FormGroup {
    return this.builder.group({
      email: [null, [Validators.required]]
    });
  }

  public addField() {
    const reviewers = this.reviewerForm.get('reviewers') as FormArray;
    reviewers.push(this.createFields());
  }

  public removeField(i) {
    const reviewers = this.reviewerForm.get('reviewers') as FormArray;
    reviewers.removeAt(i);
  }

  public close() {
    this.dialogRef.close();
  }

  public saveReviewer(): void {
    if (this.reviewerForm.valid) {
      this.adminService.registerReviewers(this.reviewerForm.value)
        .subscribe(({ reviewers }: any) => {
          if (reviewers.temErro) {
            this.toastr.error(reviewers.mensagem);
          } else {
            this.close();
          }
        });
    } else {
      this.toastr.error('Preencha todos os campos');
    }
  }

  get reviewers() {
    return this.reviewerForm.get('reviewers');
  }
}
