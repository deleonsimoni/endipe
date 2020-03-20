import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  public registerSchedule(type, form) {
    return this.http.post<any>(`${this.baseUrl}/schedule/${type}`, form);
  }

  public retrieveSchedules(type, date) {
    return this.http.get<any>(`${this.baseUrl}/schedule/${type}/${date}`);
  }

  public updateSchedule(form) {
    return this.http.post<any>(`${this.baseUrl}`, form);
  }

}
