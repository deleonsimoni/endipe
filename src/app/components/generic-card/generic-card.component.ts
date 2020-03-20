import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {

  @Input() schedule: any;
  @Input() delete: boolean;
  @Input() type: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private scheduleService: ScheduleService
  ) {

    console.log(this.schedule);

  }

  public removeSchedule(id) {
    this.scheduleService.deleteSchedule(this.type, id)
      .subscribe(() => this.update.emit(true));
  }
}
