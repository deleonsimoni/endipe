import { Component, OnInit } from '@angular/core';

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
  panelOpenState = false;
  panelOpenState2 = false;

  constructor() { }

  ngOnInit() {
    this.countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

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

}
