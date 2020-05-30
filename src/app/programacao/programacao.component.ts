import { Component, OnInit } from "@angular/core";

import { SCHEDULE_TYPE, WORK_OPTIONS } from "../declarations";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material";
import { ModalSessoesEspeciaisComponent } from "../modal-sessoes-especiais/modal-sessoes-especiais.component";
import { ModalSimposioComponent } from "../modal-simposio/modal-simposio.component";
import { ModalConferencistasComponent } from "../modal-conferencistas/modal-conferencistas.component";
import { ModalEncerramentoComponent } from "../modal-encerramento/modal-encerramento.component";
import { ModalAberturaComponent } from "../modal-abertura/modal-abertura.component";
import { ModalProgramacaoComponent } from "../modal-programacao/modal-programacao.component";
import { ScheduleService } from "../services/schedule.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-programacao",
  templateUrl: "./programacao.component.html",
  styleUrls: ["./programacao.component.scss"],
})
export class ProgramacaoComponent implements OnInit {
  public workModalities = WORK_OPTIONS;
  public programacoes = SCHEDULE_TYPE;
  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public days = ["29/10", "30/10", "31/10", "01/11"];
  public daySelected$: BehaviorSubject<string> = new BehaviorSubject<string>("29/10");
  public label = "Abertura";
  public typeId: any;
  public user: any;

  constructor(private scheduleService: ScheduleService, private authService: AuthService) {
    this.daySelected$.subscribe((_) => {
      this.listAllSchedules();
    });
  }

  ngOnInit() {
    this.listAllSchedules();

    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
    });
  }

  private listAllSchedules() {
    this.typeId = this.getType();
    const date = this.daySelected$.getValue().replace("/", "-");

    this.scheduleService.retrieveSchedules(this.typeId, date).subscribe((data) => this.schedules$.next(data));
  }

  private getType() {
    const type = this.programacoes.find((el) => el.name == this.label);
    return type.id;
  }

  public currentTab($event) {
    this.label = $event.tab.textLabel;

    this.listAllSchedules();
  }

  public selectDay(day) {
    this.daySelected$.next(day);
  }

  public showGenericCard() {
    if (this.typeId) {
      return (
        this.typeId == 1 ||
        this.typeId == 9 ||
        this.typeId == 7 ||
        this.typeId == 10 ||
        this.typeId == 11 ||
        this.typeId == 12
      );
    }

    return false;
  }

  public showSimposioCard() {
    if (this.typeId) {
      return this.typeId == 8;
    }

    return false;
  }

  public showWorkCard() {
    if (this.typeId) {
      return this.typeId == 2 || this.typeId == 4 || this.typeId == 3 || this.typeId == 5;
    }

    return false;
  }
}
