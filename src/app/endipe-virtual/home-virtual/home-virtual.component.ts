import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-virtual',
  templateUrl: './home-virtual.component.html',
  styleUrls: ['./home-virtual.component.scss']
})
export class HomeVirtualComponent implements OnInit {

  countDownDate;
  days; 
  hours;
  minutes;
  seconds;
  carregando = false;
  user;
  comments;

  constructor(    
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit() {

    this.retrieveUser();


    this.countDownDate = new Date("Oct 29, 2020 00:00:00").getTime();

    setInterval(() => {

        var now = new Date().getTime();
      
        // Find the distance between now an the count down date
        let distance = this.countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // If the count down is over, write some text 
        /*if (distance < 0) {
          clearInterval(this.countdownfunction);
          document.getElementById("demo").innerHTML = "EXPIRED";
        }*/
      }, 1000);

  }

  private retrieveUser() {

    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

  }

}
