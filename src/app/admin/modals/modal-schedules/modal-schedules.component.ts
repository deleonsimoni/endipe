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
  public axisCollection = AXIS;
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

    this.scheduleForm.get('work')
      .valueChanges
      .subscribe(res => {
        if (Object.keys(res).length > 2) {
          this.removeValues(res);
        }
      });
  }

  ngOnInit() { }

  private listAllWorks(axis) {
    this.adminService.retrieveAllWorks(axis)
      .subscribe(works => {
        if (works.temErro) {
          this.toastr.error('Erro', works);
        } else {
          this.works = works;
        }
      });
  }

  public registerSchedule() {

    if (this.scheduleForm.valid) {

      this.adminService.registerSchedule(this.scheduleForm.getRawValue())
        .subscribe(_ => this.close());

    } else {
      this.toastr.warning('Preencha todos os campos', 'Atenção:');
    }

  }

  private removeValues(item) {
    this.scheduleForm.get('work').setValue({ title: item.title, modalityId: item.modalityId });
    console.log(this.scheduleForm.controls);
    return false;
  }

  public close() {
    this.dialog.close();
  }

  public get axis() {
    const { axis } = this.scheduleForm.getRawValue();
    return axis;
  }

  public get work() {
    const { work } = this.scheduleForm.getRawValue();
    return work;
  }

  public get day() {
    const { day } = this.scheduleForm.getRawValue();
    return day;
  }

  public get hour() {
    const { hour } = this.scheduleForm.getRawValue();
    return hour;
  }

  public get room() {
    const { room } = this.scheduleForm.getRawValue();
    return room;
  }

}