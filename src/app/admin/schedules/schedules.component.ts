import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalSchedulesComponent } from '../modals/modal-schedules/modal-schedules.component';
import { AdminService } from '../admin.service';
import { ScheduleFacade } from 'src/app/facade/schedule.facade';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SCHEDULE_TYPE } from 'src/app/declarations';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public programacoes = SCHEDULE_TYPE;
  public days = ['14/07', '15/07', '16/07', '17/07'];
  public daySelected$: BehaviorSubject<string> = new BehaviorSubject<string>('14/07');
  public label = 'Abertura';

  constructor(
    private dialog: MatDialog,
    private scheduleService: ScheduleService
  ) {

    this.daySelected$.subscribe(day => {
      this.listAllSchedules();
    });

  }

  ngOnInit() {
    this.listAllSchedules();
  }

  private listAllSchedules() {
    const type = this.programacoes.find(el => el.name == this.label);
    const date = this.daySelected$.getValue().replace('/', '-');

    this.scheduleService.retrieveSchedules(type.id, date)
      .subscribe(data => this.schedules$.next(data));

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

  public currentTab($event) {
    this.label = $event.tab.textLabel;

    this.listAllSchedules();
  }

  public selectDay(day) {
    this.daySelected$.next(day);
  }

  public showGenericCard() {
    const type = this.programacoes.find(el => el.name == this.label);

    if (type) {
      return (type.id == 1 || type.id == 5 || type.id == 7 || type.id == 10 || type.id == 11 || type.id == 12);
    }

    return false;

  }
}
