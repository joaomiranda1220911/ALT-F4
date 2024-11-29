import { Component, OnInit } from '@angular/core';
//import { Cliente } from '../Models/cliente';
//import {ClienteService} from '../Services/cliente.service';
import { CarregarClienteService } from '../Services/carregar-cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carregar-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carregar-cliente.component.html',
  styleUrls: ['./carregar-cliente.component.css']
})
export class CarregarClienteComponent {
  selectedNif: string | undefined;  // nif do cliente selecionado
  valor: number | undefined;  // valor do carregamento 

  // Injeção dos serviços
  constructor(
    private carregarClienteService: CarregarClienteService,
  ) { }

  onSubmit(): void {
    if (this.selectedNif && this.valor != null && !isNaN(this.valor)) {
      // Passa os dados para o carregarClienteService
      this.carregarClienteService.carregarSaldo(this.selectedNif, this.valor).subscribe({
        next: (response) => {
          console.log('Conta carregada com sucesso:', response);
          alert('Conta carregada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao carregar conta:', error);
          alert('Ocorreu um erro ao carregar conta. Tente novamente.');
        }
      });      
    }
  }
}
