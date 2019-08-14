import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trabalhos',
  templateUrl: './trabalhos.component.html',
  styleUrls: ['./trabalhos.component.scss']
})
export class TrabalhosComponent implements OnInit {

  works = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

  receiverWork($event) {
    console.log($event);
  }

}
