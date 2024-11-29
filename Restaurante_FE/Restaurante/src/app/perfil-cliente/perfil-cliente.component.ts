import { Component } from '@angular/core';
import { PerfilClienteService } from '../Services/perfil-cliente.service';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent {
  nif: string = '';         // Armazena o NIF do cliente inserido pelo usuário
  cliente: any = null;      // Armazena os dados do cliente retornados pela API
  erro: boolean = false;    // Flag para exibir mensagem de erro, caso não encontre o cliente

  constructor(private perfilClienteService: PerfilClienteService) {}

  // Método chamado para consultar os dados do cliente
  consultarCliente(): void {
    // Chama o serviço passando o NIF para obter os dados do cliente
    this.perfilClienteService.consultarClientePorNif(this.nif).subscribe({
      next: (data) => {
        this.cliente = data;    // Armazena os dados retornados da API
        this.erro = false;       // Reseta o erro
      },
      error: (err) => {
        console.error(err);      // Exibe o erro no console (para depuração)
        this.erro = true;        // Define erro para exibir mensagem de erro
        this.cliente = null;     // Reseta os dados do cliente
      }
    });
  }
}
