import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCoordinatorComponent } from '../modal-coordinator/modal-coordinator.component';
import { AdminService } from '../admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-coordinator',
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss']
})
export class RegisterCoordinatorComponent implements OnInit, OnDestroy {

  public coordinators = [];
  private coordinatorsUnsub$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.listCoordinators();
  }

  ngOnDestroy() {
    this.coordinatorsUnsub$.next();
    this.coordinatorsUnsub$.complete();
  }

  showRegister() {
    const dialogRef = this.dialog.open(ModalCoordinatorComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.listCoordinators();
    });
  }

  private listCoordinators() {
    this.adminService.retrieveCoordinators()
      .pipe(
        takeUntil(this.coordinatorsUnsub$)
      )
      .subscribe((coordinators: any[]) => this.coordinators = coordinators);
  }
}
