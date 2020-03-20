import { Component, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AXIS } from 'src/app/declarations';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'work-schedule-form',
    templateUrl: './work-schedule-form.component.html',
    styleUrls: ['./work-schedule-form.component.scss']
})
export class WorkScheduleFormComponent {

    @Input() type: any;
    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public axis = new FormControl();
    public axisCollection = AXIS;
    public works = [];

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private adminService: AdminService
    ) {
        this.form = this.builder.group({
            work: [null],
            startTime: [null],
            endTime: [null],
            place: [null],
            address: [null],
            qtdSubscribers: [null],
            date: [null]
        });

        this.form.valueChanges.subscribe(res => console.log(res));

        this.axis.valueChanges
            .subscribe(val => this.listAllWorks(val));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.type.currentValue == '2') {
            this.form.addControl('qtdSubscribers', new FormControl(null));
        } else {
            this.form.removeControl('qtdSubscribers');
        }
    }

    private listAllWorks(axis) {
        this.adminService.retrieveAllWorks(axis)
            .subscribe(works => {
                if (works.temErro) {
                    this.toastr.error('Erro', works);
                } else {
                    this.works = works;
                }
            });
    }

    public submitSchedule() {
        this.submitForm.emit({ data: this.form.getRawValue() });
    }

}