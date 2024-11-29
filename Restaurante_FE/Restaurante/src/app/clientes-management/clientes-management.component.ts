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
    this.mostrarFormularioCarregar = true;  // Sempre abre o formulário de carregar
    this.mostrarFormularioPerfil = false;   // Fecha o formulário de perfil se estiver aberto
  }
  toggleFormularioPerfil(): void {
    this.mostrarFormularioPerfil = true;  // Sempre abre o formulário de perfil
    this.mostrarFormularioCarregar = false;  // Fecha o formulário de carregar se estiver aberto
  }
}
