import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PratoCreateComponent } from '../prato-create/prato-create.component';
import { PratoListComponent } from '../prato-list/prato-list.component';
import { PratoDefinirComponent } from '../prato-definir/prato-definir.component';

@Component({
  selector: 'app-pratos-management',
  standalone: true,
  imports: [CommonModule, PratoCreateComponent, PratoListComponent, PratoDefinirComponent],
  templateUrl: './pratos-management.component.html',
  styleUrls: ['./pratos-management.component.css'],
})
export class PratosManagementComponent {
  mostrarFormulario: boolean = false; // Controla se o formulário de criação é exibido
  mostrarFormularioListar: boolean = false; // Controla se a lista de pratos é exibida
  mostrarFormularioDefinirPrato: boolean = false; // Controla se o formulário de definir prato é exibido

  // Exibe o formulário de criação e fecha os outros
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormulario) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormularioListar = false; // Fecha o formulário 
      this.mostrarFormularioDefinirPrato = false; // Fecha o formulário 
    }
  }

  // Exibe a lista de pratos e fecha os outros
  toggleFormularioListar(): void {
    this.mostrarFormularioListar = !this.mostrarFormularioListar; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormularioListar) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormulario = false; // Fecha o formulário 
      this.mostrarFormularioDefinirPrato = false; // Fecha o formulário 
    }
  }

  // Exibe o formulário de definir prato e fecha os outros
  toggleFormularioDefinirPrato(): void {
    this.mostrarFormularioDefinirPrato = !this.mostrarFormularioDefinirPrato; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormularioDefinirPrato) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormulario = false; // Fecha o formulário 
      this.mostrarFormularioListar = false; // Fecha o formulário 
    }
  }
}
