import { Component, OnInit } from '@angular/core';

import { PROGRAMACOES, WORK_OPTIONS } from '../declarations';
import { AdminService } from '../admin/admin.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.scss']
})
export class ProgramacaoComponent implements OnInit {

  public programacoes = PROGRAMACOES;
  private workOptions = WORK_OPTIONS;
  public schedules$: Observable<any[]>;
  public days = ['14/07', '15/07', '16/07', '17/07'];
  public daySelected$: BehaviorSubject<string> = new BehaviorSubject<string>('14/07');
  public label = 'Abertura';

  constructor(
    private adminService: AdminService
  ) {

    this.daySelected$.subscribe(day => {
      console.log(day);
      const modality = this.filterModality(this.label);

      if (modality) {
        this.schedules$ = this.listSchedulesFiltered(modality.id, day);
      }
    });

  }

  ngOnInit() {
    this.schedules$ = this.adminService.retrieveSchedules()
      .pipe(map(res => this.orderByHour(res)));
  }

  private orderByHour(data) {
    return data.sort((a, b) => Number(a.hour.replace(':', '')) - Number(b.hour.replace(':', '')));
  }

  public currentTab($event) {
    this.label = $event.tab.textLabel;

    const modality = this.filterModality(this.label);

    if (modality) {
      this.schedules$ = this.listSchedulesFiltered(modality.id, this.daySelected$.getValue());
    }
  }

  private listSchedulesFiltered(modality, day) {
    return this.adminService.retrieveByFilter(modality, day)
      .pipe(map(res => this.orderByHour(res)));
  }

  public filterModality(label) {
    return this.workOptions.find(el => this.formatFilters(label).includes(this.formatFilters(el.name).substring(0, 4)));
  }

  private formatFilters(label): string {
    label = label.toLowerCase();
    return label.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  public selectDay(day) {
    this.daySelected$.next(day);
  }
}
