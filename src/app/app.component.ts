import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'endipe';

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  reason = '';

  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        console.log(result);
        return result.matches;
      })
    );

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


}
