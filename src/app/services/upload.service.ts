import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  uploadFile(fileDOC: File, filePDF: File, id: string, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileArray', filePDF, `${id}/${filePDF.name}`);
    formData.append('fileArray', fileDOC, `${id}/${fileDOC.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/user/uploadWork/xxendiperio2020/${id}`, formData);
  }

  gerarPagamento(file: File, id: string, formulario: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, `${id}/${file.name}`);
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.baseUrl}/user/gerarPagamento/xxendiperio2020/${id}`, formData);
  }
}
