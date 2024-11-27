import { Component } from '@angular/core';
import { EncomendaCreateComponent } from '../encomenda-create/encomenda-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encomendas-management',
  standalone: true,
  imports: [CommonModule, EncomendaCreateComponent],
  templateUrl: './encomendas-management.component.html',
  styleUrl: './encomendas-management.component.css'
})
export class EncomendasManagementComponent {
  mostrarFormulario: boolean = false;  // Variável para controlar a exibição do formulário

  // Função para alternar a exibição do formulário
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
