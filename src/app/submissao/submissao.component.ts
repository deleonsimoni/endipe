import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
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
  private files: FileList;

  constructor(
    private builder: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService
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

  public upload() {
    if (this.files[0].type.indexOf('pdf') === -1){
      this.toastr.error('O arquivo selecionado não é um PDF.', 'Error');
      //fileInput.value = '';
      return;
    }
    this.uploadService.uploadFile(this.files[0], 'EndipeRio2020', this.submissionForm.value).subscribe(data => {
      this.toastr.success('Upload feito com sucesso.', 'Success');
    });
  }

  public getFileName(): string {
    const fileName = this.files ? this.files[0].name : 'Upload Trabalho';
    return fileName;
  }

  public setFileName(files: FileList): void {
    this.files = files;
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
