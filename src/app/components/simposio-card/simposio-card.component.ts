import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'simposio-card',
    templateUrl: './simposio-card.component.html',
    styleUrls: ['./simposio-card.component.scss']
})
export class SimposioCardComponent {

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
