import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalSchedulesComponent } from '../modals/modal-schedules/modal-schedules.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  public schedules = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public addSchedule() {
    const dialogRef = this.dialog.open(ModalSchedulesComponent);

    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
}
