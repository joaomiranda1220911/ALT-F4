import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarEmentaComponent } from '../ementa-consultar/ementa-consultar.component';

@Component({
  selector: 'app-ementa-management',
  standalone: true,
  imports: [CommonModule, ConsultarEmentaComponent],
  templateUrl: './ementa-management.component.html',
  styleUrls: ['./ementa-management.component.css']
})
export class EmentaManagementComponent {
  mostrarFormularioEmenta: boolean = false;

  toggleFormularioEmenta(): void {
    if (this.mostrarFormularioEmenta) {
      this.mostrarFormularioEmenta = false; // Fecha se já estiver aberto
    } else {
      this.mostrarFormularioEmenta = true;  // Abre o formulário de carregar
    }
  }
}
