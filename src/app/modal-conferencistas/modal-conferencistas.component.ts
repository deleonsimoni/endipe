import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ConferencistaService } from '../services/conferencista.service';
import { Observable } from 'rxjs';
import { DownloadFileService } from '../services/download-file.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal-conferencistas',
  templateUrl: './modal-conferencistas.component.html',
  styleUrls: ['./modal-conferencistas.component.scss']
})
export class ModalConferencistasComponent implements OnInit {

  public conferencistas: any[] = [];
  carregando = false;
  constructor(
    public dialogRef: MatDialogRef<ModalConferencistasComponent>,
    public conferencistaService: ConferencistaService,
    public donwloadService: DownloadFileService,
    public _DomSanitizationService: DomSanitizer

  ) { }

  ngOnInit() {
    this.conferencistaService.listar().subscribe((res: any) => {
      this.carregando = false;
      this.conferencistas = res;
      this.getImageConferencista();

    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public getImageConferencista() {

    this.conferencistas.forEach(element => {

      this.donwloadService.getImage(element.imagePathS3).subscribe((res: any) => {
        element.imagem = "data:image/jpeg;base64," + this.encode(res.data.Body.data);
        console.log(element)
      }, err => {
        console.log('Erro ao obter a imagem');
      });

    });

  }

  encode(data) {
    var str = data.reduce(function (a, b) { return a + String.fromCharCode(b) }, '');
    return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
  }

}
