import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input() schedule: any;

  constructor() { }

  ngOnInit() {
  }

}
