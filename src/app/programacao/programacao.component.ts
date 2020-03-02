import { Component, OnInit } from '@angular/core';

import { PROGRAMACOES } from '../declarations';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.scss']
})
export class ProgramacaoComponent implements OnInit {

  public programacoes = PROGRAMACOES;

  constructor() { }

  ngOnInit() {
  }

}
