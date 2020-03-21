import { Component, OnInit, Input, Output } from '@angular/core';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ModalReviewAdminComponent } from '../../admin/modals/modal-review-admin/modal-review-admin.component';
import { ModalReviewReviewerComponent } from '../../admin/modals/modal-review-reviewer/modal-review-reviewer.component';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.scss']
})
export class WorkDataComponent implements OnInit {

  @Input() work: any;

  @Input() user: any;

  public carregando;
  private filesDOC: FileList;
  private filesPDF: FileList;

  constructor(
    private downloadService: DownloadFileService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private uploadService: UploadService,

  ) { }

  ngOnInit() {
  }

  public download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
    this.downloadService.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  public getFileNameDOC(): string {
    const fileName = this.filesDOC ? this.filesDOC[0].name : 'Alterar DOC';
    return fileName;
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : 'Alterar PDF';
    return fileName;
  }

  public setFileNameDOC(files: FileList): void {
    this.filesDOC = files;
  }

  public setFileNamePDF(files: FileList): void {
    this.filesPDF = files;
  }

  public alterarArquivos() {

    if (!this.filesDOC && !this.filesPDF) {
      this.toastr.error('Selecione novos arquivos.', 'Atenção: ');
      return;
    }

    this.carregando = true;

    this.uploadService.alterUserWorkFile(this.filesDOC ? this.filesDOC[0] : null, this.filesPDF ? this.filesPDF[0] : null, 'trabalhos', this.work._id)
      .subscribe(res => {
        this.carregando = false;

        if (res && res.temErro) {
          this.toastr.error(res.mensagem, 'Erro: ');
        } else {

          this.toastr.success('Trabalho alterado com sucesso. Atualize a página para verificar', 'Sucesso');
          this.work = res;
          this.filesDOC = null;
          this.filesPDF = null;
        }
      }, err => {
        this.carregando = false;
        this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
      });
  }

  public addReviewer(work) {

    const dialogRef = this.dialog.open(ModalReviewAdminComponent, {
      data: { work: work }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        work.reviewAdmin = result.reviewAdmin;
      }
    });
  }

  public addReviewerCoordinator(work) {

    const dialogRef = this.dialog.open(ModalReviewReviewerComponent, {
      data: { work: work }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        work.reviewReviewer = result.reviewReviewer;
      }
    });

  }
}
