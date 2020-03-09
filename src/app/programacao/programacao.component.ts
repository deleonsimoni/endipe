import { Component, OnInit } from '@angular/core';

import { PROGRAMACOES } from '../declarations';
import { Observable, BehaviorSubject } from 'rxjs';
import { ScheduleFacade } from '../facade/schedule.facade';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.scss']
})
export class ProgramacaoComponent implements OnInit {

  public programacoes = PROGRAMACOES;
  public schedules$: Observable<any[]>;
  public days = ['14/07', '15/07', '16/07', '17/07'];
  public daySelected$: BehaviorSubject<string> = new BehaviorSubject<string>('14/07');
  public label = 'Abertura';

  constructor(
    private scheduleFacade: ScheduleFacade
  ) {

    this.daySelected$.subscribe(day => {
      console.log(day);
    });

  }

  ngOnInit() {
    this.schedules$ = this.scheduleFacade.retrieveSchedule();
  }

  public currentTab($event) {
    this.label = $event.tab.textLabel;

    this.schedules$ = this.scheduleFacade.retrieveSchedule(this.label);
  }

  // private listSchedulesFiltered(modality, day) {
  //   return this.scheduleFacade.retrieveSchedule(modality, day);
  // }

  public selectDay(day) {
    this.daySelected$.next(day);
  }
}
