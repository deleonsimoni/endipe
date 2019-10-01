import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ModalCoordinatorComponent } from '../modal-coordinator/modal-coordinator.component';

@Component({
  selector: 'app-register-coordinator',
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss']
})
export class RegisterCoordinatorComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  showRegister() {
    const dialogRef = this.dialog.open(ModalCoordinatorComponent);

    dialogRef.afterClosed().subscribe();
    // if (this.coordinatorForm.valid) {
    //   console.log(this.coordinatorForm.value);
    //   return;
    // }

    // this.toastr.error('Preencha todos os campos.', 'Atenção: ');
    // return;
  }
}
