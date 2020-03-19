import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent {

    public form: FormGroup;

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
}
