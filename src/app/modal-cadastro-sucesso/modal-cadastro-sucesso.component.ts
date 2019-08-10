import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-cadastro-sucesso',
  templateUrl: './modal-cadastro-sucesso.component.html',
  styleUrls: ['./modal-cadastro-sucesso.component.scss']
})
export class ModalCadastroSucessoComponent implements OnInit {

  public count = 10;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.count--;
      if (this.count === 0) {
        // this.router.navigate(['/home']);
      }
    }, 1000);
  }

}
