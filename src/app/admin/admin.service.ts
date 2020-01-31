import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private db = [];

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  public validatePayment(id) {
    return this.http.post(`${this.baseUrl}/admin/validatePayment/${id}`, {});
  }

  public invalidatePayment(id) {
    return this.http.post(`${this.baseUrl}/admin/invalidatePayment/${id}`, {});
  }

  public retrieveUsers(page, search) {
    return this.http.get(`${this.baseUrl}/admin/usrs?page=${page}&search=${search}`);
  }

  public registerCoordinator(form, axisId) {
    return this.http.post(`${this.baseUrl}/user/coordinator/${axisId}`, form);
  }

  public retrieveCoordinators(axisId) {
    return this.http.get<any>(`${this.baseUrl}/user/coordinators/${axisId}`);
  }

  public deleteCoordinator(id) {
    return this.http.delete(`${this.baseUrl}/user/coordinator/${id}`);
  }

  public markCoordinator(id) {
    return this.http.post(`${this.baseUrl}/user/markCoordinator/${id}`, null);
  }

  public markReviewerWork(idWork, idReviewer, emailReviewer) {
    return this.http.post(`${this.baseUrl}/user/markReviewerWork/${idWork}/${idReviewer}/${emailReviewer}`, null);
  }

  public unmarkCoordinator(id) {
    return this.http.post(`${this.baseUrl}/user/unmarkCoordinator/${id}`, null);
  }

  public registerReviewers(form) {
    return this.http.post(`${this.baseUrl}/user/reviewer`, form);
  }

  public retrieveReviewers(id) {
    return this.http.get<any>(`${this.baseUrl}/user/reviewer/${id}`);
  }

  public deleteReviewer(id) {
    return this.http.delete(`${this.baseUrl}/user/reviewer/${id}`);
  }

  public recoverMetrics() {
    return this.http.get<any>(`${this.baseUrl}/admin/metrics`);
  }

  public retrieveUserWorks(id) {
    return this.http.get<any>(`${this.baseUrl}/admin/getUserWorks/${id}`);
  }

  public retrieveAllWorks(id) {
    return this.http.get<any>(`${this.baseUrl}/admin/works/${id}`);
  }

  public updateUser(form) {
    return this.http.post(`${this.baseUrl}/admin/editUser`, form);
  }

  public registerSchedule(form) {

    return new Observable(obs => {
      this.db.push(form);
      return obs.next(form);
    });

  }

  public retrieveSchedules() {

    return new Observable(obs => {
      return obs.next(this.db);
    });

  }

}
