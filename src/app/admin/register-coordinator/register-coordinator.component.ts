import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCoordinatorComponent } from '../modal-coordinator/modal-coordinator.component';

@Component({
  selector: 'app-register-coordinator',
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss']
})
export class RegisterCoordinatorComponent {

  public coordinators = [];

  constructor(
    private dialog: MatDialog
  ) { }

  showRegister() {
    const dialogRef = this.dialog.open(ModalCoordinatorComponent);
    dialogRef.afterClosed().subscribe();
  }
}
