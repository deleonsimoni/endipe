import { Component, OnInit } from '@angular/core';
import { CertificadoService } from './certificado.service';

import html2canvas from 'html2canvas';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {

  constructor(
    private certifiedService: CertificadoService
  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
  }

  public downloadCertified() {
    const templateWidth = document.querySelector('.certified').clientWidth;
    const templateHeight = document.querySelector('.certified').clientHeight;

    html2canvas(document.querySelector('.certified'), {
      height: templateHeight, width: templateWidth
    }).then(res => {
      setTimeout(() => {
        const img = res.toDataURL();
        window.location.href = img;
      }, 200);
    });
  }
}
