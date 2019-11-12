import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent {

  @Input() work: any;
  @Output() selected = new EventEmitter();

  constructor() { }

  public selectWork(work): void {
    this.selected.emit(work);
  }
}
