import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
    selector: 'simposio-form',
    templateUrl: './simposio-form.component.html',
    styleUrls: ['./simposio-form.component.scss']
})
export class SimposioFormComponent {

    public form: FormGroup;
    @Input() type: number;

    constructor(
        private builder: FormBuilder,
        private scheduleService: ScheduleService
    ) {
        this.createForm();
    }

    private createForm() {

        this.form = this.builder.group({
            theme: [null],
            type: [null],
            startTime: [null],
            date: [null],
            endTime: [null],
            place: [null],
            address: [null],
            classification: [null],
            themeSpeeches: [null],
            coordinators: this.builder.array([
                this.createField()
            ])
        });

    }

    private createField() {
        return this.builder.control(null);
    }

    get coordinators() {
        return this.form.get('coordinators')['controls'];
    }

    public addCoordinator() {
        const coordinatorCtrl = this.form.get('coordinators') as FormArray;
        coordinatorCtrl.push(this.createField());
    }

    public removeCoordinator(pos) {
        const coordinatorCtrl = this.form.get('coordinators') as FormArray;
        coordinatorCtrl.removeAt(pos);
    }

    public submitSchedule() {
        console.log(this.form.value);
        this.scheduleService.registerSchedule(this.type, this.form.getRawValue())
            .subscribe(res => console.log(res));
    }

}