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

  // Função para alternar a exibição do formulário
  toggleFormularioCriar() {
    this.mostrarFormularioCriar = !this.mostrarFormularioCriar;
  }

  toggleFormularioListar() {
    this.mostrarFormularioListar = !this.mostrarFormularioListar;
  }
}
