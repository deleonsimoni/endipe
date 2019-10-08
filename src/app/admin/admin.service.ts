import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dbCoodinators: any[] = [];
  private dbReviewers: any[] = [];

  constructor() { }

  public registerCoordinator(form) {
    return Observable.create(obs => {
      this.dbCoodinators.push(form);
      obs.next(this.dbCoodinators);
    });
  }

  public retrieveCoordinators() {
    return Observable.create(obs => obs.next(this.dbCoodinators));
  }

  public registerReviewers(form) {
    return Observable.create(obs => {
      this.dbReviewers.push(form);
      obs.next(this.dbReviewers);
    });
  }

  public retrieveReviewers() {
    return Observable.create(obs => obs.next(this.dbReviewers));
  }

}
