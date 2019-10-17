import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dbCoodinators: any[] = [];
  private dbReviewers: any[] = [];

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  public registerCoordinator(form) {
    return this.http.post(`${this.baseUrl}/user/coordinator`, form);
  }

  public retrieveCoordinators() {
    return this.http.get<any>(`${this.baseUrl}/user/coordinators`);
  }

  public deleteCoordinator(id) {
    return this.http.delete(`${this.baseUrl}/user/coordinator/${id}`);
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
