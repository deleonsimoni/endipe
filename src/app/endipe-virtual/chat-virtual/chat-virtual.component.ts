import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-virtual',
  templateUrl: './chat-virtual.component.html',
  styleUrls: ['./chat-virtual.component.scss']
})
export class ChatVirtualComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private authService: AuthService,

    ) { }

  user;
  postAuthorEmail = '';
  comments;
  carregando = false;
  newComment = null;

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {

    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    this.postAuthorEmail = this.user.email;

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

  parseContent(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };

  isAuthor(email) {
    return email === this.postAuthorEmail;
  } 

  love (commentId){
    this.comments.forEach(comment => {
      if (comment.id == commentId)
        comment.loved = !comment.loved
    });      
  }

  reply(author) {
      if (!this.newComment.content)
      this.newComment.content = ''

      if (this.newComment.content.search('@' + author + '@') == -1) {
        if (this.newComment.content[0] == '@')
          this.newComment.content = ', ' + this.newComment.content
        else
          this.newComment.content = ' ' + this.newComment.content

         this.newComment.content = '@' + author + '@' + this.newComment.content
      }
  }

  addNewComment() {
      if(this.newComment && this.newComment.length > 2){
      
            this.newComment = this.newComment.replace(/(@[^@.]+)@/, '<span class="reply">$1</span>')
            this.newComment = this.newComment.replace(/https?:\/\/(www.)?([a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+)/, '<a href="//$2">$2</a>')
            if(this.comments._id){

              this.http.put(`${this.baseUrl}/chat-admin/chat`, this.newComment).subscribe((res: any) => {
                this.comments.chat.push({
                    content: this.newComment,
                    publisher: {
                      user: this.user._id,
                      name: this.user.fullname, 
                      email: this.user.email
                    }
                  });

                this.toastr.success("Mensagem enviada com sucesso", "Sucesso");
              }, err => {
                this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
              });

            } else {

              this.http.post(`${this.baseUrl}/chat-admin/chat`, this.newComment).subscribe((res: any) => {
                this.comments.chat.push({
                    content: this.newComment,
                    publisher: {
                      user: this.user._id,
                      name: this.user.fullname, 
                      email: this.user.email
                    }
                  });

                this.toastr.success("Mensagem enviada com sucesso", "Sucesso");
              }, err => {
                this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
              });

          }
      } else {
        this.toastr.error("Preencha sua mensagem antes de enviar", "Atenção");

      }
  }



}
