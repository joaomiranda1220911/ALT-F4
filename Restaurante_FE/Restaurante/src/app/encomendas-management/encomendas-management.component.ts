import { Component } from '@angular/core';
import { EncomendaCreateComponent } from '../encomenda-create/encomenda-create.component';
import { CommonModule } from '@angular/common';
import { EncomendasListComponent } from "../encomendas-list/encomendas-list.component";

@Component({
  selector: 'app-encomendas-management',
  standalone: true,
  imports: [CommonModule, EncomendaCreateComponent, EncomendasListComponent],
  templateUrl: './encomendas-management.component.html',
  styleUrl: './encomendas-management.component.css'
})
export class EncomendasManagementComponent {
  mostrarFormularioCriar: boolean = false;  // Variável para controlar a exibição do formulário
  mostrarFormularioListar: boolean = false;  // Variável para controlar a exibição do formulário

  // Alterna a exibição do formulário de criar encomendas
  toggleFormularioCriar() {
    this.mostrarFormularioCriar = !this.mostrarFormularioCriar; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormularioCriar) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormularioListar = false; // Fecha o formulário 
    }
  }

  // Alterna a exibição do formulário de listar encomendas
  toggleFormularioListar() {
    this.mostrarFormularioListar = !this.mostrarFormularioListar; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormularioListar) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormularioCriar = false; // Fecha o formulário 
    }
  }
}