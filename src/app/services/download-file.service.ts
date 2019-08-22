import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  getFile(fileName) {
    //return this.http.get(`${this.baseUrl}user/downloadFile?fileName=${fileName}`);
    return this.http.get(`${this.baseUrl}/user/downloadFile?fileName=xxendiperio2020/trabalhos/Boletos.pdf`);

  }
}
