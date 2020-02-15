import { Component, OnInit, Input } from '@angular/core';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ModalReviewAdminComponent } from '../modals/modal-review-admin/modal-review-admin.component';
import { ModalReviewReviewerComponent } from '../modals/modal-review-reviewer/modal-review-reviewer.component';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.scss']
})
export class WorkDataComponent implements OnInit {

  @Input() work: any;

  public carregando;

  constructor(
    private downloadService: DownloadFileService,
    private dialog: MatDialog,
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

  public addReviewer(workId) {

    const dialogRef = this.dialog.open(ModalReviewAdminComponent, {
      data: { workId: workId }
    });

    //dialogRef.afterClosed().subscribe(() => this.listar());

  }

  public addReviewerCoordinator(work) {

    const dialogRef = this.dialog.open(ModalReviewReviewerComponent, {
      data: { work: work }
    });

    //dialogRef.afterClosed().subscribe(() => this.listar());

  }
}
