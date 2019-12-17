import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent implements OnInit {

  @Input() work: any;
  @Input() reviewers: any;

  @Output() selected = new EventEmitter();

  public selectReview;

  ngOnInit() {

  }

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  public selectWork(work): void {
    this.selected.emit(work);
  }

  public markReviewerWork(idWork): void {
    if(!this.selectReview){
      this.toastr.error('Erro', 'É necessário selecionar um parecerista');
    } else {
      this.adminService.markReviewerWork(idWork, this.selectReview._id, this.selectReview.email)
        .subscribe((res: any) => {
          if (res.temErro) {
            this.toastr.error('Erro', res);
          } else {
            this.toastr.success('Sucesso', 'Parecerista vinculado com sucesso ao trabalho');
          }
        });
    }
  }
}
