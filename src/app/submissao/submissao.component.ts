import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.scss']
})
export class SubmissaoComponent implements OnInit {

  @Input() receberDados = new Observable();
  @Output() enviarDados = new EventEmitter();

  public user: any;
  public carregando = true;
  public enviando = false;
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
    private toastr: ToastrService,
    private authService: AuthService

  ) {
    this.receberDados.subscribe(res => console.log(res));
  }

  ngOnInit() {

    this.createForm();
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.carregando = false;
    });

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
      if (!this.filesPDF) {
        this.toastr.error('É necessário selecionar o arquivo PDF', 'Atenção');
        return;
      } if (!this.filesDOC[0]) {
        // tslint:disable-next-line: align
        this.toastr.error('É necessário selecionar o arquivo DOC', 'Atenção');
        return;
      } if (this.filesPDF[0].type.indexOf('pdf') === -1){
        this.toastr.error('O arquivo Upload PDF precisa ser um PDF.', 'Atenção');
        //fileInput.value = '';
        return;
      // tslint:disable-next-line: align
      } if (this.filesDOC[0].type.indexOf('doc') === -1
           && this.filesDOC[0].type.indexOf('docx') === -1
           && this.filesDOC[0].type.indexOf('msword') === -1) {
        this.toastr.error('O arquivo Upload DOC precisa ser um DOC.', 'Atenção');
        return;
      // tslint:disable-next-line: align
      } if (!this.submissionForm.value.axisId) {
        this.toastr.error('Selecione um eixo.', 'Atenção');
        return;
      } if (!this.submissionForm.value.modalityId) {
        // tslint:disable-next-line: align
        this.toastr.error('Selecione uma modalidade.', 'Atenção');
        return;
      } if (!this.submissionForm.value.title) {
        // tslint:disable-next-line: align
        this.toastr.error('Selecione o titulo do trabalho.', 'Atenção');
        return;
      } if (this.submissionForm.value.authors && !this.submissionForm.value.authors[0].email) {
        // tslint:disable-next-line: align
        this.toastr.error('Indique ao menos um autor do trabalho.', 'Atenção');
        return;
      } else {
        this.enviando = true;
        this.uploadService.uploadFile(this.filesDOC[0], this.filesPDF[0], 'trabalhos', this.submissionForm.value).subscribe(() => {
          this.carregando = true;
          this.authService.refresh().subscribe((res: any) => {
            this.user = res.user;
            this.carregando = false;
          });

          this.enviando = false;
          this.toastr.success('Trabalho submetido com sucesso.', 'Sucesso');
          this.submissionForm.reset();
          this.filesDOC = null;
          this.filesPDF = null;
        }, err => {
          this.enviando = false;
          this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
        });
      }
  }

  public getFileNameDOC(): string {
    const fileName = this.filesDOC ? this.filesDOC[0].name : 'DOC/DOCX Sem Identificação';
    return fileName;
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : 'PDF Com Identificação';
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
