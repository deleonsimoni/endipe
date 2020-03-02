import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin/admin.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent {

  @Input() schedule: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private adminService: AdminService
  ) { }

  public removeSchedule(id) {
    this.adminService.deleteSchedule(id)
      .subscribe(() => this.update.emit(true));
  }
}
