import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  public paymentForm: FormGroup;
  public idCategoria: number;
  public valorTotal: number;

  public categorias = [
    { id: 1, name: 'Estudantes de curso Normal/EM' },
    { id: 2, name: 'Estudantes de Graduação' },
    { id: 3, name: 'Estudantes de Pós-Graduação' },
    { id: 4, name: 'Professores da Educação Básica' },
    { id: 5, name: 'Professores da Educação Superior' }
  ];

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
  ) {

    this.paymentForm = this.builder.group({
      id: [null]
    });

  }

  ngOnInit() {

    this.paymentForm.valueChanges.subscribe(res => {
      if (res) {
        this.atualizarValor(res.id);
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
