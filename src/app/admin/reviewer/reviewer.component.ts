import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalReviewerComponent } from '../modal-reviewer/modal-reviewer.component';
import { Subject } from 'rxjs';
import { AdminService } from '../admin.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.scss']
})
export class ReviewerComponent implements OnInit, OnDestroy {

  public reviewers = [];
  private reviewersUnsub$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.listReviewers();
  }

  ngOnDestroy() {
    this.reviewersUnsub$.next();
    this.reviewersUnsub$.complete();
  }

  public register() {
    const dialogRef = this.dialog.open(ModalReviewerComponent);

    dialogRef.afterClosed().subscribe(() => this.listReviewers());
  }

  private listReviewers() {
    this.adminService.retrieveReviewers()
      .pipe(
        takeUntil(this.reviewersUnsub$)
      )
      .subscribe(({ reviewers }) => {
        this.reviewers = reviewers;
      });
  }

  public removeReviewer(id) {
    this.adminService.deleteReviewer(id)
      .pipe(
        takeUntil(this.reviewersUnsub$)
      )
      .subscribe(() => this.listReviewers());
  }
}
