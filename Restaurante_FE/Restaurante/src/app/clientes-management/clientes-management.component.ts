import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarregarClienteComponent } from '../carregar-cliente/carregar-cliente.component';


@Component({
  selector: 'app-clientes-management',
  standalone: true,
  imports: [CommonModule, CarregarClienteComponent],
  templateUrl: './clientes-management.component.html',
  styleUrl: './clientes-management.component.css'
})

export class ClientesManagementComponent {
  mostrarFormularioCarregar: boolean = false;

  // Alterna a exibição do formulário de definir prato
  toggleFormularioCarregar(): void {
    this.mostrarFormularioCarregar = !this.mostrarFormularioCarregar;
  }
}
