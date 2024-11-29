import { EncomendaService } from '../Services/encomenda.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-encomenda-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './encomenda-create.component.html',
  styleUrls: ['./encomenda-create.component.css']
})

export class EncomendaCreateComponent implements OnInit {
  encomendaForm: FormGroup;
  saldoInsuficiente: boolean = false;
  refeicoes: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private encomendaSrv: EncomendaService) {
    // Inicializa o formulário com validações
    this.encomendaForm = this.fb.group({
      clienteNif: ['', [Validators.required]],
      refeicaoId: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Carregar as refeicoes
    this.encomendaSrv.getRefeicoes().subscribe({
      next: (data) => this.refeicoes = data,
      error: (err) => console.error('Erro ao carregar tipos de prato:', err),
    });
  }

  // Envia a encomenda
  onSubmit() {
    if (this.encomendaForm.valid) {
      const encomendaData = this.encomendaForm.value;
      const encomenda = {
        cliente: encomendaData.clienteNif,
        refeicao: encomendaData.refeicaoId,
        valor: encomendaData.valor,
      };

      this.encomendaSrv.createEncomenda(encomenda).subscribe(
        response => {
          // Exibe mensagem de sucesso
          this.successMessage = 'Encomenda criada com sucesso!';
          // Limpa a mensagem de erro e o formulário, se necessário
          this.saldoInsuficiente = false;
          this.encomendaForm.reset();
        },
        error => {
          if (error.status === 400) {
            this.saldoInsuficiente = true;
          } else {
            this.successMessage = ''; // Limpar a mensagem de sucesso se ocorrer erro
            alert('Erro ao criar a encomenda.');
          }
        }
      );
    }
  }
}