import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'work-schedule-card',
    templateUrl: './work-schedule-card.component.html',
    styleUrls: ['./work-schedule-card.component.scss']
})
export class WorkScheduleCardComponent {

    @Input() schedule: any;
    @Input() admin = false;
    @Input() type: any;
    @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();

    public userId: string;

    constructor(
        private scheduleService: ScheduleService,
        private authService: AuthService
    ) { }

    ngAfterViewInit() {
        if (!this.userId) {
            this.authService.refresh()
                .subscribe(({ user }: any) => {
                    this.userId = user._id
                });
        }
    }

    ngOnDestroy() {
        this.schedule = {};
    }

    public removeSchedule(id) {
        this.scheduleService.deleteSchedule(this.type, id)
            .subscribe(() => this.update.emit(true));
    }

    public isSubscribe() {
        if (this.userId && this.schedule && this.schedule.hasOwnProperty('subscribers')) {
            return this.schedule.subscribers.some(el => el.userId == this.userId);
        }

        return false;
    }

    public signUp() {
        this.scheduleService.enrollSchedule(this.schedule._id)
            .subscribe(res => {
                this.schedule = res;
            });
    }

    public cancelSignUp() {
        this.scheduleService.cancelEnrollSchedule(this.schedule._id)
            .subscribe(res => {
                this.schedule = res;
            });
    }

    public editSchedule() {
        this.edit.emit(this.schedule);
    }
}
