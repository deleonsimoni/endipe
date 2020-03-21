import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SCHEDULE_TYPE } from '../../../declarations';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-modal-schedules',
  templateUrl: './modal-schedules.component.html',
  styleUrls: ['./modal-schedules.component.scss']
})
export class ModalSchedulesComponent {

  public types = SCHEDULE_TYPE;
  public axis = new FormControl();

  constructor(
    private dialog: MatDialogRef<ModalSchedulesComponent>,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public form: any
  ) { }

  ngAfterViewInit() {
    if (this.form) {
      this.axis.patchValue(this.form.type);
    }
  }

  public close() {
    this.dialog.close();
  }

  public get showGenericForm() {
    if (this.axis.value) {
      const axis = Number(this.axis.value);
      return (axis == 1 || axis == 5 || axis == 7 || axis == 10 || axis == 11 || axis == 12);
    }

    return false;
  }

  public get showSimposioForm() {
    if (this.axis.value) {
      const axis = Number(this.axis.value);

      return axis == 3;
    }

    return false;
  }

  public get showWorkScheduleForm() {
    if (this.axis.value) {
      const axis = Number(this.axis.value);
      return (axis == 2 || axis == 4 || axis == 8 || axis == 9);
    }

    return false;
  }

  public sendSchedule(event) {
    this.scheduleService.registerSchedule(this.axis.value, event.data)
      .subscribe(_ => {
        this.toastr.success('Programação cadastrada com sucesso');
        this.dialog.close(true);
      });
  }
}
