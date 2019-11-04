import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCoordinatorComponent } from '../modals/modal-coordinator/modal-coordinator.component';
import { AdminService } from '../admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit, OnDestroy {

  public coordinators = [];
  private coordinatorsUnsub$ = new Subject();

  public eixos = [
    { id: 1, name: 'Eixo 1' },
    { id: 2, name: 'Eixo 2' },
    { id: 3, name: 'Eixo 3' },
    { id: 4, name: 'Eixo 4' },
    { id: 5, name: 'Eixo 5' },
    { id: 6, name: 'Eixo 6' }
  ];

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
      .subscribe(({ coordinators }) => this.coordinators = coordinators);
  }

  public removeCoordinator(id) {
    this.adminService.deleteCoordinator(id)
      .pipe(
        takeUntil(this.coordinatorsUnsub$)
      )
      .subscribe(() => this.listCoordinators());
  }
}
