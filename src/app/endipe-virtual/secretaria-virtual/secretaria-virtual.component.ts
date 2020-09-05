import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretaria-virtual',
  templateUrl: './secretaria-virtual.component.html',
  styleUrls: ['./secretaria-virtual.component.scss']
})
export class SecretariaVirtualComponent implements OnInit {

  panelOpenState = false;
  panelOpenState2 = false;
  
  constructor() { }

  ngOnInit() {
  }

}
