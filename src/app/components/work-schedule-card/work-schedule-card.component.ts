import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
    selector: 'work-schedule-card',
    templateUrl: './work-schedule-card.component.html',
    styleUrls: ['./work-schedule-card.component.scss']
})
export class WorkScheduleCardComponent {

    @Input() schedule: any;
    @Input() delete = false;
    @Input() type: any;
    @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private scheduleService: ScheduleService
    ) { }

    public removeSchedule(id) {
        this.scheduleService.deleteSchedule(this.type, id)
            .subscribe(() => this.update.emit(true));
    }

}
