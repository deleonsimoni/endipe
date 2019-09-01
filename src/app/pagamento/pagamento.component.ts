import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../services/upload.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  public paymentForm: FormGroup;
  public idCategoria: number;
  public valorTotal: number;
  public carregando = true;
  public enviando = false;

  public categorias = [
    { id: 1, name: 'Estudantes de curso Normal/EM' },
    { id: 2, name: 'Estudantes de Graduação' },
    { id: 3, name: 'Estudantes de Pós-Graduação' },
    { id: 4, name: 'Profissionais da Educação Básica' },
    { id: 5, name: 'Profissionais da Educação Superior' }
  ];

  private filesPDF: FileList;
  public user: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private uploadService: UploadService

  ) {

    this.paymentForm = this.builder.group({
      categoryId: [null]
    });

  }

  ngOnInit() {
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.carregando = false;
    });
    this.paymentForm.valueChanges.subscribe(res => {
      if (res.categoryId) {
        this.atualizarValor(res.categoryId);
      } else {
        this.valorTotal = null;
      }
    });

  }

  public atualizarValor(id): void {
    this.userService.atualizarValor(id)
      .subscribe((res: any) => {
        this.valorTotal = res.price;
      },
        (err) => {
          console.log(err);
        });
  }

  public getFileNamePDF(): string {
    const fileName = this.filesPDF ? this.filesPDF[0].name : 'Upload Comprovante';
    return fileName;
  }

  public setFileNamePDF(files: FileList): void {
    this.filesPDF = files;
  }

  public gerarPagamento() {
    if (!this.paymentForm.value.categoryId) {
      // tslint:disable-next-line: align
      this.toastr.error('Selecione uma categoria para pagamento.', 'Atenção');
      return;
    } else if (this.paymentForm.value.categoryId !== 4 || this.paymentForm.value.categoryId !== 5) {
      if (!this.filesPDF) {
        this.toastr.error('É necessário selecionar o arquivo de comprovante do vinculo com a instituição', 'Atenção');
        return;
        // tslint:disable-next-line: align
      } if (this.filesPDF[0].size > 2500 * 1027) {
        this.toastr.error('O comprovante deve ter no máximo 2MB', 'Atenção');
        return;
      }
    } else {

      this.enviando = true;

      this.uploadService.gerarPagamento(this.filesPDF[0], 'comprovantes', this.paymentForm.value).subscribe(() => {
        this.enviando = false;
        this.user.payment = this.paymentForm.value;
        this.toastr.success('Aguarde avaliação do pagamento', 'Sucesso');
        this.paymentForm.reset();
        this.filesPDF = null;
      }, err => {
        this.enviando = false;
        this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
      });
    }
  }

  public pagar(): void {

    const request = {
      price: this.valorTotal
    };

    this.userService.pagar(request)
      .subscribe((res) => {
        console.log(res);
      },
        (err) => {
          console.log(err);
        });
  }
}
