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
    @Input() data: any;
    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public axisCollection = AXIS;
    public works = [];
    public days = ['14/07', '15/07', '16/07', '17/07'];
    public selectedWork;
    modelConfig = { standalone: true };

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private adminService: AdminService
    ) {
        this.form = this.builder.group({
            work: [null],
            axis: [null],
            startTime: [null],
            endTime: [null],
            place: [null],
            address: [null],
            workTitle: [null],
            qtdSubscribers: [null],
            date: [null]
        });

        this.form.valueChanges.subscribe(res => console.log(res));

        this.form.get('axis').valueChanges
            .subscribe(val => this.listAllWorks(val));
    }

    public setWorkForm(workForm) {
        this.form.get('work').patchValue(workForm._id);
        this.form.get('workTitle').patchValue(workForm.title);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.type.currentValue == '2') {
            this.form.addControl('qtdSubscribers', new FormControl(null));
        } else {
            this.form.removeControl('qtdSubscribers');
        }

        if (changes.data && changes.data.currentValue) {
            this.fillForm(changes.data.currentValue);
        }
    }

    private fillForm(data) {
        for (const key in this.form.controls) {
            if (data.hasOwnProperty(key)) {
                this.form.get(key).patchValue(data[key]);
            }
        }
    }

    private listAllWorks(axis) {
        this.adminService.retrieveAllWorksValids(axis)
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