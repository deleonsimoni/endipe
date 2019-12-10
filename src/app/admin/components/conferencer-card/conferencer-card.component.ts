import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'conferencer-card',
  templateUrl: './conferencer-card.component.html',
  styleUrls: ['./conferencer-card.component.scss']
})
export class ConferencerCardComponent {

  @Input() public name: string;
  @Input() public imagePathS3: string;
  @Input() public description: string;


  constructor() { }

}
