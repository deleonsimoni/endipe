import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CertificadoService } from './certificado.service';

import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {

  constructor(
    private certifiedService: CertificadoService,
    private authService: AuthService,

  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  public user: any;
  carregando = false;

  ngOnInit() {
    this.carregando = true;
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.carregando = false;
    });
  }

  createPdf(): void {
    let pdf = new jsPDF('l', 'pt', 'a4');
    let options = {
      pagesplit: true
    };
    /*pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
      pdf.save("test.pdf");
    });*/
  }

  public captureScreen() {
    this.carregando = true;

    let data = document.getElementById('certificado');

    html2canvas(data).then(canvas => {
      let imgWidth = 300;
      let imgHeight = 190;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      this.carregando = false;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Certificado Endipe.pdf'); // Generated PDF
    });

  }
}
