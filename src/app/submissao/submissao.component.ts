import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.scss']
})
export class SubmissaoComponent implements OnInit {

  public submissionForm: FormGroup;
  public authors = new Array();
  public showAdd = true;
  public workOptions = [
    'Pôster',
    'Painel',
    'Minicurso',
    'Roda de conversa'
  ];

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {

    this.createForm();
    console.log(this.submissionForm.value);

  }

  private createForm(): void {

    this.submissionForm = this.builder.group({
      option: [null],
      title: [null],
      authors: this.builder.array([
        this.createFields()
      ])
    });

    this.submissionForm.controls.authors.valueChanges.subscribe(res => {
      if (res.length >= 4) {
        this.showAdd = false;
      }
    });

  }

  private createFields() {
    return this.builder.group({
      name: [null]
    });
  }

  public addAuthors() {
    const authors = this.submissionForm.get('authors') as FormArray;
    // console.log(authors.controls);
    if (authors.controls.length < 4) {
      authors.push(this.createFields());
    }
  }
}
