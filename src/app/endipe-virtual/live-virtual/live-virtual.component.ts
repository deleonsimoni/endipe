import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';


@Component({
  selector: 'app-live-virtual',
  templateUrl: './live-virtual.component.html',
  styleUrls: ['./live-virtual.component.scss']
})
export class LiveVirtualComponent implements OnInit {

  date;
  schedules = [];
  scheduleSelect;


  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private scheduleService: ScheduleService,

  ) { }

  ngOnInit() {

    let dateNow = new Date();
    let dd = dateNow.getDate().toString();
    let mm = dateNow.getMonth().toString();
    let formattedDate = 29 + '/' + 10;
    this.date = formattedDate;
    this.getListVirtual();
  }


  selectSchedule(id) {
    if (this.scheduleSelect == id) {
      this.scheduleSelect = null;
    } else {
      this.scheduleSelect = id;
    }
  }

  public getListVirtual() {

    this.http.get(`${this.baseUrl}/live/getScheduleByDay?date=${this.date}`).subscribe(
      (res: any) => {
        if (res.abertura) {
          res.abertura.forEach(element => {
            element.type = 1;
          });
          this.schedules.concat(res.abertura);
        }

        if (res.encerramento) {
          res.encerramento.forEach(element => {
            element.type = 12;
          });
          this.schedules.concat(res.encerramento);
        }

        res.simposio.forEach(element => {
          element.type = 8;
        });

        res.atividadeCultural.forEach(element => {
          element.type = 7;
        });

        //     res.lancamentoDeLivros.forEach(element => {
        //       element.type = 9;
        //     });

        res.rodaReunioesEntidadesRedes.forEach(element => {
          element.type = 1;
        });

        res.sessoesEspeciais.forEach(element => {
          element.type = 9;
        });



        this.schedules = [
          ...res.atividadeCultural,
          ...res.rodaReunioesEntidadesRedes,
          ...res.simposio,
          ...res.sessoesEspeciais,
          // ...res.lancamentoDeLivros,
          ...res.abertura,
          ...res.encerramento

        ]

        if (this.schedules) {
          this.schedules.forEach(element => {
            if (element.authors) {
              element.authors = element.authors.split(',');
            }
          });
        }
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
      }
    );

  }
}



