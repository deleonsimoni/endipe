import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-secretaria-virtual',
  templateUrl: './secretaria-virtual.component.html',
  styleUrls: ['./secretaria-virtual.component.scss']
})
export class SecretariaVirtualComponent implements OnInit {

  panelOpenState = false;
  panelOpenState2 = false;
  carregando = false;
  @Input() user: any;
  comments;

  constructor(    
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit() {
    this.getChatAdmin();
  }
    
  getChatAdmin(){
    this.carregando = true;
    this.http.get(`${this.baseUrl}/chat-admin/chat`).subscribe(
      (res: any) => {
        this.comments = res;
        this.carregando = false;
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregando = false;
      }
    );
  }


}
