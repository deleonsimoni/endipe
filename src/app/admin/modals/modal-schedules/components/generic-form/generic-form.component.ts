import { Component, Output, EventEmitter, SimpleChanges, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "generic-form",
  templateUrl: "./generic-form.component.html",
  styleUrls: ["./generic-form.component.scss"],
})
export class GenericFormComponent {
  @Input() type: any;
  @Input() data: any;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11", "13/11"];

  constructor(private builder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.form = this.builder.group({
      titles: this.builder.array([this.createField()]),
      date: [null],
      startTime: [null],
      endTime: [null],
      place: [null],
      virtual: this.builder.group({ linkYoutube: [null] }),
      address: [null],
      theme: [null],
      coordinators: this.builder.array([this.createCoordinatorsField()]),
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
        if (key == "titles") {
          this.fillArray(data.titles, key);
        } else if (key == "coordinators") {
          this.fillArray(data.coordinators, key);
        } else {
          this.form.get(key).patchValue(data[key]);
        }
      }
    }
  }

  private fillArray(data, keyForm) {
    const form = this.form.get(keyForm) as FormArray;
    data.forEach((el, key) => {
      if (key == 0) {
        form.controls[0].patchValue(el);
      } else {
        if (keyForm == "coordinators") {
          form.push(this.builder.group(el));
        } else {
          form.push(this.builder.control(el));
        }
      }
    });
  }

  public createField() {
    return this.builder.control(null);
  }

  private createCoordinatorsField() {
    return this.builder.group({
      name: [null],
      isCoordinator: [false],
    });
  }

  get titles() {
    return this.form.get("titles");
  }

  get coordinators() {
    return this.form.get("coordinators");
  }

  public addTitles() {
    const titlesCtrl = this.form.get("titles") as FormArray;
    titlesCtrl.push(this.createField());
  }

  public removeTitles(pos) {
    const titlesCtrl = this.form.get("titles") as FormArray;
    titlesCtrl.removeAt(pos);
  }

  public addCoordinator() {
    const coordinatorCtrl = this.form.get("coordinators") as FormArray;
    coordinatorCtrl.push(this.createCoordinatorsField());
  }

  public removeCoordinator(pos) {
    const coordinatorCtrl = this.form.get("coordinators") as FormArray;
    coordinatorCtrl.removeAt(pos);
  }

  public submitSchedule() {
    this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
  }

  get title() {
    switch (this.type) {
      case "5":
        return "Títulos e autores";

      case "7":
        return "Artista(s)";

      case "11":
        return "Associação/Rede/Fórum e sigla";

      default:
        return "Título(s)";
    }
  }
}
