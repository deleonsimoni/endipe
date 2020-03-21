import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {

  @Input() schedule: any;
  @Input() delete = false;
  @Input() type: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

  public user: string;

  constructor(
    private scheduleService: ScheduleService,
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.authService.refresh()
      .subscribe(({ user }: any) => {
        this.user = user._id
      });
  }

  public removeSchedule(id) {
    this.scheduleService.deleteSchedule(this.type, id)
      .subscribe(() => this.update.emit(true));
  }

  public isSubscribe() {
    if (this.user) {
      return this.schedule.subscribers.some(el => el == this.user);
    }

    return false;
  }
}
