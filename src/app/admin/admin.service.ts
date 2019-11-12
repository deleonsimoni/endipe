import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  public retrieveUsers() {
    return this.http.get(`${this.baseUrl}/admin/usrs`);
  }

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
    return this.http.post(`${this.baseUrl}/user/reviewer`, form);
  }

  public retrieveReviewers() {
    return this.http.get<any>(`${this.baseUrl}/user/reviewer`);
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
}
