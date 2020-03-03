import { Component, OnInit } from '@angular/core';

import { PROGRAMACOES } from '../declarations';
import { AdminService } from '../admin/admin.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.scss']
})
export class ProgramacaoComponent implements OnInit {

  public programacoes = PROGRAMACOES;
  public schedules$: Observable<any[]>;
  public daySelected = '14/07';

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.schedules$ = this.adminService.retrieveSchedules()
      .pipe(map(res => this.orderByHour(res)));
  }

  private orderByHour(data) {
    return data.sort((a, b) => Number(a.hour.replace(':', '')) - Number(b.hour.replace(':', '')));
  }

  public currentTab($event) {
    console.log($event.tab.textLabel);
  }
}
