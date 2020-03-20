import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent {

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public days = ['14/07', '15/07', '16/07', '17/07'];

    constructor(
        private builder: FormBuilder
    ) {
        this.createForm();
    }

    private createForm() {

        this.form = this.builder.group({
            titles: this.builder.array([
                this.createField()
            ]),
            date: [null],
            startTime: [null],
            endTime: [null],
            place: [null],
            address: [null],
            theme: [null],
            coordinators: this.builder.array([
                this.createField()
            ])
        });

    }

    public createField() {
        return this.builder.control(null);
    }

    get titles() {
        return this.form.get('titles')['controls'];
    }

    get coordinators() {
        return this.form.get('coordinators')['controls'];
    }

    public addTitles() {
        const titlesCtrl = this.form.get('titles') as FormArray;
        titlesCtrl.push(this.createField());
    }

    public removeTitles(pos) {
        const titlesCtrl = this.form.get('titles') as FormArray;
        titlesCtrl.removeAt(pos);
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
