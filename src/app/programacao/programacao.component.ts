import { Component, OnInit } from '@angular/core';

import { PROGRAMACOES, WORK_OPTIONS } from '../declarations';
import { BehaviorSubject } from 'rxjs';
import { ScheduleFacade } from '../facade/schedule.facade';
import { MatDialog } from '@angular/material';
import { ModalSessoesEspeciaisComponent } from '../modal-sessoes-especiais/modal-sessoes-especiais.component';
import { ModalSimposioComponent } from '../modal-simposio/modal-simposio.component';
import { ModalConferencistasComponent } from '../modal-conferencistas/modal-conferencistas.component';
import { ModalEncerramentoComponent } from '../modal-encerramento/modal-encerramento.component';
import { ModalAberturaComponent } from '../modal-abertura/modal-abertura.component';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.scss']
})
export class ProgramacaoComponent implements OnInit {

  public workModalities = WORK_OPTIONS;
  public programacoes = PROGRAMACOES;
  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public days = ['14/07', '15/07', '16/07', '17/07'];
  public daySelected$: BehaviorSubject<string> = new BehaviorSubject<string>('14/07');
  public label = 'Pôster';

  constructor(
    private dialog: MatDialog,
    private scheduleFacade: ScheduleFacade
  ) {

    this.daySelected$.subscribe(day => {
      console.log(day);
    });

  }

  ngOnInit() {
    this.scheduleFacade.retrieveSchedule()
      .subscribe(data => this.schedules$.next(data));
  }

  public currentTab($event) {
    this.label = $event.tab.textLabel;

    this.scheduleFacade.retrieveSchedule(this.label)
      .subscribe(data => this.schedules$.next(data));
  }

  public selectDay(day) {
    this.daySelected$.next(day);
  }

  public openDialogProgramacao(programacao) {
    switch (programacao.titulo) {
      case 'Sessões especiais':
        this.dialog.open(ModalSessoesEspeciaisComponent, {
          data: { item: programacao }
        });
        break;

      case 'Simpósios':
        this.dialog.open(ModalSimposioComponent, {
          data: { item: programacao }
        });
        break;

      case 'Conferencistas':
        this.dialog.open(ModalConferencistasComponent);
        break;

      case 'Encerramento':
        this.dialog.open(ModalEncerramentoComponent, {
          data: { item: programacao }
        });
        break;

      case 'Abertura':
        this.dialog.open(ModalAberturaComponent, {
          data: { item: programacao }
        });
        break;

      default:
        this.dialog.open(ModalProgramacaoComponent, {
          data: { item: programacao }
        });
        break;
    }
  }
}
