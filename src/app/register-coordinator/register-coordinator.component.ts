import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-coordinator',
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss']
})
export class RegisterCoordinatorComponent implements OnInit {

  public coordinatorForm: FormGroup;
  public eixos = [
    { id: 1, name: 'Eixo 1' },
    { id: 2, name: 'Eixo 2' },
    { id: 3, name: 'Eixo 3' },
    { id: 4, name: 'Eixo 4' },
    { id: 5, name: 'Eixo 5' },
    { id: 6, name: 'Eixo 6' }
  ];

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService
  ) {

    this.coordinatorForm = this.builder.group({
      axis: [null, [Validators.required]],
      authors: this.builder.array([
        this.createFields()
      ])
    });

    this.coordinatorForm.get('axis').valueChanges.subscribe(res => {
      const control = this.coordinatorForm.controls['authors'] as FormArray;
      for (let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    });
  }

  ngOnInit() {
  }

  private createFields() {
    return this.builder.group({
      email: [null, [Validators.required]]
    });
  }

  public addAuthors() {
    const authors = this.coordinatorForm.get('authors') as FormArray;
    authors.push(this.createFields());
  }

  register() {
    if (this.coordinatorForm.valid) {
      console.log(this.coordinatorForm.value);
      return;
    }

    this.toastr.error('Preencha todos os campos.', 'Atenção: ');
    return;
  }
}
