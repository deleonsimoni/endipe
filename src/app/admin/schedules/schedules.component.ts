import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalSchedulesComponent } from '../modals/modal-schedules/modal-schedules.component';
import { AdminService } from '../admin.service';
import { ScheduleFacade } from 'src/app/facade/schedule.facade';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  public schedules = [];

  constructor(
    private dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    const date = new Date(2020, 0, 10).toISOString();
    this.listAllSchedules();
  }

  private listAllSchedules() {

    this.scheduleService.retrieveSchedules(3, new Date(2001, 11, 2).toISOString())
      .subscribe(res => {
        console.log(res);
      })

  }

  public addSchedule() {
    const dialogRef = this.dialog.open(ModalSchedulesComponent, {
      maxHeight: '100vh'
    });

    dialogRef.afterClosed().subscribe(res => this.listAllSchedules());
  }

  public updateList() {
    this.listAllSchedules();
  }
}
