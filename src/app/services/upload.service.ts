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

  uploadFile(file: File, id: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, '${id}/${file.name}');
    return this.http.post(`${this.baseUrl}/user/uploadWork` + id, formData);
  }
}
