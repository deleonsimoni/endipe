import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-meu-endipe',
  templateUrl: './meu-endipe.component.html',
  styleUrls: ['./meu-endipe.component.scss']
})
export class MeuEndipeComponent implements OnInit {

  countDownDate;
  days; 
  hours;
  minutes;
  seconds;

  user;
  schedules = [];
  carregando = false;
  carregandoLista = false;
  scheduleSelect;

  constructor(
    private authService: AuthService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,


  ) { }
/*
  ngOnInit() {

    this.countDownDate = new Date("Oct 29, 2020 00:00:00").getTime();

    setInterval(() => {

      var now = new Date().getTime();
    
      let distance = this.countDownDate - now;
      
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    }, 1000);
  }*/
  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    this.getUserSubscribers();
  }

  selectSchedule(id){
    if(this.scheduleSelect == id){
      this.scheduleSelect = null;
    } else {
      this.scheduleSelect = id;
    }
  }

  getUserSubscribers(){
    this.carregandoLista = true;
    this.http.get(`${this.baseUrl}/live/getSubscribersUser`).subscribe(
      (res: any) => {
        this.schedules = res.filter((obj) => obj );;
        this.carregandoLista = false;
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregandoLista = false;
      }
    );
  }

  public isSubscribe(scheduleSelect) {
    if (this.user._id && scheduleSelect.hasOwnProperty('subscribers')) {
        return scheduleSelect.subscribers.some(el => el.userId == this.user._id);
    }
  
    return false;
  }
    
  public cancelSignUp(type, scheduleFull) {
      this.carregando = true;
      if (type == 4) {
          this.scheduleService.cancelEnrollSchedule(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
  
      } else if (type == 5) {
          this.scheduleService.cancelEnrollSchedulePainel(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
  
      } else {
          this.scheduleService.cancelEnrollScheduleRodaDeConversa(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
      }
  }

}
