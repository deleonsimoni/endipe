import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { ModalConferencerComponent } from '../modals/modal-conferencer/modal-conferencer.component';

@Component({
  selector: 'app-conferencer',
  templateUrl: './conferencer.component.html',
  styleUrls: ['./conferencer.component.scss']
})
export class ConferencerComponent implements OnInit {

  public conferencers$: Observable<any>;

  conferencers = [
    { name: 'chico bento', institution: 'usp' },
    { name: 'caetano veloso', institution: 'uva' },
    { name: 'slash', institution: 'GNR' },
    { name: 'corey taylor', institution: 'slpkn' },
    { name: 'lula', institution: 'ufrj' }
  ];

  constructor(
    private publicService: PublicService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listAllConferencers();
  }

  private listAllConferencers() {
    this.conferencers$ = this.publicService.retrieveConferencers();
  }

  public addConferencer() {
    const dialogRef = this.dialog.open(ModalConferencerComponent);

    dialogRef.afterClosed();
  }
}
