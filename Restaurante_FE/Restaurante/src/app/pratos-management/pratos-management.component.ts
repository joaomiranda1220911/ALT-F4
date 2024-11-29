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
  mostrarFormulario: boolean = false;  // Controla se o formulário de criação é exibido
  mostrarFormularioListar: boolean = false;  // Controla se a lista de pratos é exibida
  mostrarFormularioDefinirPrato: boolean = false // Controla se o formulario de definir prato é exibida

  // Alterna a exibição do formulário de criação de prato
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // Alterna a exibição da lista de pratos
  toggleFormularioListar(): void {
    this.mostrarFormularioListar = !this.mostrarFormularioListar;
  }

  // Alterna a exibição do formulário de definir prato
  toggleFormularioDefinirPrato(): void {
    this.mostrarFormularioDefinirPrato = !this.mostrarFormularioDefinirPrato;
  }
}
