import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.retrieveAdminData();
  }

  private retrieveAdminData() {
    this.authService.adminData()
      .subscribe(res => console.log(res));
  }
}
