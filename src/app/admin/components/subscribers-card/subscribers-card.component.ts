import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'subscribers-card',
  templateUrl: './subscribers-card.component.html',
  styleUrls: ['./subscribers-card.component.scss']
})
export class SubscribersCardComponent implements OnInit {

  @Input() subscribed: any;
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public selectUser(user): void {
    this.selected.emit(user);
  }
}
