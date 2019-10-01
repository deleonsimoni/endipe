import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalReviewerComponent } from '../modal-reviewer/modal-reviewer.component';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.scss']
})
export class ReviewerComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  register() {
    const dialogRef = this.dialog.open(ModalReviewerComponent);

    dialogRef.afterClosed().subscribe();
  }
}
