import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'node_modules/jwt-decode';

const TOKEN_KEY = '_edt';
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
    return this.http.get(`${this.baseUrl}/auth/me`);
  }

  setUser(user, token): void {
    window.localStorage.setItem(TOKEN_KEY,  token);
    (<any> window).user = user;
  }

  public getUser(): string {
    return (<any>window).user;
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    } catch(Error){
        return null;
    }
  }

}
