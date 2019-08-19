import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.scss']
})
export class SubmissaoComponent implements OnInit {

  @Input() receberDados = new Observable();
  @Output() enviarDados = new EventEmitter();

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
  ) {
    this.receberDados.subscribe(res => console.log(res));
  }

  ngOnInit() {

    this.createForm();

  }

  private createForm(): void {

    this.submissionForm = this.builder.group({
      option: [null, [Validators.required]],
      title: [null, [Validators.required]],
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
    if (this.submissionForm.valid) {
      if (this.files[0].type.indexOf('pdf') === -1 || this.files[0].type.indexOf('doc') === -1 || this.files[0].type.indexOf('docx') === -1){
        this.toastr.error('O arquivo selecionado precisa ser um PDF ou um DOC.', 'Atenção');
        //fileInput.value = '';
        return;
      } else {
        this.uploadService.uploadFile(this.files[0], 'EndipeRio2020', this.submissionForm.value).subscribe(data => {
          this.toastr.success('Upload feito com sucesso.', 'Sucesso');
        });
      }
    }
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
