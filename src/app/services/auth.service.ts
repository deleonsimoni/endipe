import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  loginUser(form) {
    return this.http.post(`${this.baseUrl}/auth/login`, form);
  }

  createUser(form) {
    return this.http.post(`${this.baseUrl}/auth/register`, form);
  }

  me() {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.baseUrl}/auth/me`, { headers: header });
  }

}
