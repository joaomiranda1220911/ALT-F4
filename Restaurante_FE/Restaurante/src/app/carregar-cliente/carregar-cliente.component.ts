import { Component, OnInit } from '@angular/core';
import { CarregarClienteService } from '../Services/carregar-cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-carregar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carregar-cliente.component.html',
  styleUrls: ['./carregar-cliente.component.css']
})
export class CarregarClienteComponent {
  selectedNif: string | undefined;  // nif do cliente selecionado
  valor: number | undefined;  // valor do carregamento 
  errorMessage: string | undefined;  // mensagem de erro
  successMessage: string | undefined;

  // Injeção dos serviços
  constructor(
    private carregarClienteService: CarregarClienteService,
  ) { }

  onSubmit(): void {
    this.errorMessage = undefined;  // Limpar mensagem de erro antes de submeter
    this.successMessage = undefined;
    if (this.selectedNif && this.valor != null && !isNaN(this.valor)) {
      // Passa os dados para o carregarClienteService
      this.carregarClienteService.carregarSaldo(this.selectedNif, this.valor).subscribe({
        next: (response) => {
          console.log('Conta carregada com sucesso:', response);
          this.successMessage = 'Conta carregada com sucesso!';
        },
        error: (error) => {
          console.error('Erro ao carregar conta:', error);
          this.errorMessage = 'Ocorreu um erro ao carregar a conta. Tente novamente.';
        }
      });      
    }
  }
}

