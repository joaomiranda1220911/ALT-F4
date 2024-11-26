import { Component } from '@angular/core';
import { PratoCreateComponent } from '../prato-create/prato-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pratos-management',
  standalone: true,
  imports: [CommonModule,PratoCreateComponent],
  templateUrl: './pratos-management.component.html',
  styleUrl: './pratos-management.component.css'
})
export class PratosManagementComponent {
  mostrarFormulario: boolean = false;  // Variável para controlar a exibição do formulário

  // Função para alternar a exibição do formulário
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
