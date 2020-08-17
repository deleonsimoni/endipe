import { Component, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { AXIS } from "src/app/declarations";
import { AdminService } from "src/app/admin/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "work-schedule-form",
  templateUrl: "./work-schedule-form.component.html",
  styleUrls: ["./work-schedule-form.component.scss"],
})
export class WorkScheduleFormComponent {
  @Input() type: any;
  @Input() data: any;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;
  public axisCollection = AXIS;
  public works = [];
  public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11"];
  public selectedWork;
  public modelConfig = { standalone: true };

  constructor(private builder: FormBuilder, private toastr: ToastrService, private adminService: AdminService) {
    this.form = this.builder.group({
      work: [null],
      axis: [null],
      startTime: [null],
      endTime: [null],
      place: [null],
      authors: [null],
      address: [null],
      virtual: this.builder.group({ linkZoom: [null], monitor: [null], mediator: [null], ppt: [null] }),
      pdf: [null],
      workTitle: [null],
      qtdSubscribers: [null],
      qtdDias: [null],
      resumePropose: [null],
      date: [null],
    });

    this.form.get("axis").valueChanges.subscribe((val) => {
      this.listAllWorks(Number(val), Number(this.type));
    });
  }

  public setWorkForm(workForm) {
    this.form.get("work").patchValue(workForm._id);
    this.form.get("workTitle").patchValue(workForm.title);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.fillForm(changes.data.currentValue);
    }
  }

  private fillForm(data) {
    for (const key in this.form.controls) {
      if (data.hasOwnProperty(key)) {
        if (key == "axis") {
          this.form.get(key).patchValue(Number(data[key]));
        }
        this.form.get(key).patchValue(data[key]);
      }
    }
  }

  private listAllWorks(axis, modality) {
    if (this.type != "3") {
      this.adminService.retrieveAllWorksValids(axis, modality).subscribe((works) => {
        if (works.temErro) {
          this.toastr.error("Erro", works);
        } else {
          this.works = works;
        }
      });
    }
  }

  public get axis() {
    return this.form.get("axis").value;
  }

  public diffTypeP() {
    return this.type != "3";
  }

  public submitSchedule() {
    this.submitForm.emit({ id: this.data ? this.data._id : null, data: this.form.getRawValue() });
  }
}
