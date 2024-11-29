import { Component, OnInit } from '@angular/core';
import { EncomendaService } from '../Services/encomenda.service';
import { Encomenda } from '../Models/encomenda';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-encomenda-list',
  templateUrl: './encomendas-list.component.html',
  styleUrls: ['./encomendas-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,NgIf, NgFor, CommonModule],
})
export class EncomendasListComponent implements OnInit {
  encomendaFormByCliente: FormGroup;
  clienteId: number = 0; // Inicializa com um valor padrão
  encomendas: Encomenda[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private encomendaSrv: EncomendaService) {
    // Inicializa o formulário com validações
    this.encomendaFormByCliente = this.fb.group({
      nifCliente: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Submissão do formulário
  onSubmit(): void {
    if (this.encomendaFormByCliente.valid) {
      this.encomendaSrv.createEncomenda(this.encomendaFormByCliente.value).subscribe({
        next: () => {
          this.encomendaFormByCliente.reset(); // Reseta o formulário após submissão bem-sucedida
        },
        error: (err) => {
          this.errorMessage = 'Erro. Tente novamente.';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
  }

  loadEncomendas(): void {
    this.encomendaSrv.getEncomendasByCliente(this.clienteId).subscribe({
      next: (data: Encomenda[]) => {
          this.encomendas = data;
          this.errorMessage = ''; // Limpa mensagens de erro
      },
      error: (err) => {
          this.errorMessage = 'Erro ao carregar as encomendas';
          console.error(err);
      }
  });
  }
}
