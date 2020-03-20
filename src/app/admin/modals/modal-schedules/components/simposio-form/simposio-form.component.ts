import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { THEME_SIMPOSIO } from 'src/app/declarations';

@Component({
    selector: 'simposio-form',
    templateUrl: './simposio-form.component.html',
    styleUrls: ['./simposio-form.component.scss']
})
export class SimposioFormComponent {

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public themes = THEME_SIMPOSIO;

    constructor(
        private builder: FormBuilder
    ) {
        this.createForm();
    }

    private createForm() {

        this.form = this.builder.group({
            theme: [null],
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
        this.submitForm.emit({ data: this.form.getRawValue() });
    }

}