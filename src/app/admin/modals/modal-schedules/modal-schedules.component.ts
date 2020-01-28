import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AXIS } from '../../../declarations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-schedules',
  templateUrl: './modal-schedules.component.html',
  styleUrls: ['./modal-schedules.component.scss']
})
export class ModalSchedulesComponent implements OnInit {

  public days = [
    '14', '15', '16', '17'
  ];
  public axis = AXIS;
  public works = [];
  public scheduleForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<ModalSchedulesComponent>,
    private builder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {

    this.scheduleForm = this.builder.group({
      axis: [null, Validators.required],
      work: [null, Validators.required],
      day: [null, Validators.required],
      hour: [null, Validators.required],
      room: [null, Validators.required]
    });

    this.scheduleForm.get('axis')
      .valueChanges
      .subscribe(axis => this.listAllWorks(axis));

  }

  ngOnInit() { }

  private listAllWorks(axis) {
    this.adminService.retrieveAllWorks(axis)
      .subscribe(works => {
        console.log(works);
        if (works.temErro) {
          this.toastr.error('Erro', works);
        } else {
          this.works = works;
        }
      });
  }

  public registerSchedule() {

    if (this.scheduleForm.valid) {
      console.log(this.scheduleForm.value);
    }

  }


  public close() {
    this.dialog.close();
  }

}
