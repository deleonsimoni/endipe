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
    {id: 1, name: 'Pôster'},
    {id: 2, name: 'Painel'},
    {id: 3, name: 'Minicurso'},
    {id: 4, name: 'Roda de conversa'}
  ];
  public eixos = [
    {id: 1, name: 'Formação docente'},
    {id: 2, name: 'Currículo e avaliação'},
    {id: 3, name: 'Direitos humanos, Interculturalidade e Religiões'},
    {id: 4, name: 'Nova epistemologia, Diferença, Biodiversidade, Democracia e Inclusão'},
    {id: 5, name: 'Educação, Comunicação e Técnologia'},
    {id: 6, name: 'Infâncias, Juventudes e Vida Adulta'}
  ];
  private filesDOC: FileList;
  private filesPDF: FileList;


  constructor(
    private builder: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService
  ) {
    this.receberDados.subscribe(res => console.log(res));
  }

  ngOnInit() {

    this.createForm();
    this.submissionForm.valueChanges.subscribe(res => console.log(res));

  }

  private createForm(): void {

    this.submissionForm = this.builder.group({
      axisId: [null, [Validators.required]],
      modalityId: [null, [Validators.required]],
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
      if (this.filesPDF[0].type.indexOf('pdf') === -1){
        this.toastr.error('O arquivo Upload PDF precisa ser um PDF.', 'Atenção');
        //fileInput.value = '';
        return;
      } if(this.filesDOC[0].type.indexOf('doc') === -1){
        this.toastr.error('O arquivo Upload DOC precisa ser um DOC.', 'Atenção');
        return;
      } else {
        this.uploadService.uploadFile(this.filesDOC[0], this.filesPDF[0], 'EndipeRio2020', this.submissionForm.value).subscribe(() => {
          this.toastr.success('Upload feito com sucesso.', 'Sucesso');
        });
      }
    }
  }

  public getFileNameDOC(): string {
    const fileName = this.filesDOC ? this.filesDOC[0].name : 'Upload DOC';
    return fileName;
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : 'Upload PDF';
    return fileName;
  }

  public setFileNameDOC(files: FileList): void {
    this.filesDOC = files;
  }

  public setFileNamePDF(files: FileList): void {
    this.filesPDF = files;
  }

  private createFields() {
    return this.builder.group({
      email: [null]
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
