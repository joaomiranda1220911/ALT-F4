import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarregarClienteComponent } from '../carregar-cliente/carregar-cliente.component';
import { PerfilClienteComponent } from '../perfil-cliente/perfil-cliente.component';


@Component({
  selector: 'app-clientes-management',
  standalone: true,
  imports: [CommonModule, CarregarClienteComponent, PerfilClienteComponent],
  templateUrl: './clientes-management.component.html',
  styleUrl: './clientes-management.component.css'
})

export class ClientesManagementComponent {
  mostrarFormularioCarregar: boolean = false;
  mostrarFormularioPerfil: boolean = false;

  // Alterna a exibição do formulário de definir prato
  toggleFormularioCarregar(): void {
    if (this.mostrarFormularioCarregar) {
      this.mostrarFormularioCarregar = false; // Fecha se já estiver aberto
    } else {
      this.mostrarFormularioCarregar = true;  // Abre o formulário de carregar
      this.mostrarFormularioPerfil = false;  // Fecha o formulário de perfil
    }
  }

  // Alterna a exibição do formulário de perfil do cliente
  toggleFormularioPerfil(): void {
    if (this.mostrarFormularioPerfil) {
      this.mostrarFormularioPerfil = false; // Fecha se já estiver aberto
    } else {
      this.mostrarFormularioPerfil = true;  // Abre o formulário de perfil
      this.mostrarFormularioCarregar = false; // Fecha o formulário de carregar
    }
  }
}