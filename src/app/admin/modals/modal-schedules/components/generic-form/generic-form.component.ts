import { Component, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generic-form',
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent {

    @Input() type: any;
    @Input() data: any;
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
            this.fillForm(changes.data.currentValue);
        }
    }

    private fillForm(data) {
        for (const key in this.form.controls) {
            if (data.hasOwnProperty(key)) {
                console.log(key)
                if (key == 'titles' || key == 'coordinators') {
                    this.fillArray(data.coordinators, key);
                } else {
                    this.form.get(key).patchValue(data[key]);
                }
            }
        }
    }

    private fillArray(data, key) {
        const form = this.form.get(key) as FormArray;
        data.forEach((el, key) => {
            if (key == 0) {
                form.controls[0].patchValue(el);
            } else {
                form.push(this.builder.control(el));
            }
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
        this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
    }

    get title() {
        if (this.type == '11') {
            return 'Associação/Rede/Fórum e sigla'
        }

        if (this.type == '7') {
            return 'Artista(s)';
        }

        return 'Título(s)';
    }
}
