import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalSchedulesComponent } from '../modals/modal-schedules/modal-schedules.component';
import { AdminService } from '../admin.service';
import { ScheduleFacade } from 'src/app/facade/schedule.facade';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  public schedules = [];

  constructor(
    private dialog: MatDialog,
    private scheduleFacade: ScheduleFacade
    // private adminService: AdminService
  ) { }

  ngOnInit() {
    this.listAllSchedules();
  }

  private listAllSchedules() {

    this.scheduleFacade.retrieveSchedule()
      .subscribe(res => this.schedules = res);
    // this.adminService.retrieveSchedules()
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.schedules = res;
    //   });

  }

  public addSchedule() {
    const dialogRef = this.dialog.open(ModalSchedulesComponent);

    dialogRef.afterClosed().subscribe(res => this.listAllSchedules());
  }

  public updateList() {
    this.listAllSchedules();
  }
}
