import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-schedules',
  templateUrl: './modal-schedules.component.html',
  styleUrls: ['./modal-schedules.component.scss']
})
export class ModalSchedulesComponent implements OnInit {

  public days = [
    '14', '15', '16', '17'
  ];

  constructor(
    private dialog: MatDialogRef<ModalSchedulesComponent>
  ) { }

  ngOnInit() {
  }

  private listAllWorks() { }

  public registerSchedule() { }


  public close() {
    this.dialog.close();
  }

}
