import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }


  atualizarValor(form) {
    return this.http.post(`${this.baseUrl}/user/payment`, form);
  }

  pagar(form) {
    return this.http.get(`${this.baseUrl}/user/price/` + form);
  }

}
