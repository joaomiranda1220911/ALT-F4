import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefeicaoCreateComponent } from '../refeicao-create/refeicao-create.component';
import { RefeicaoRemoveComponent } from '../refeicao-remove/refeicao-remove.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-refeicao-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RefeicaoCreateComponent, RefeicaoRemoveComponent], 
  templateUrl: './refeicao-management.component.html',
  styleUrls: ['./refeicao-management.component.css'],
})

export class RefeicoesManagementComponent {
  mostrarFormulario: boolean = false; // Controla se o formulário de criação é exibido
  mostrarFormularioRemover: boolean = false; // Controla se a lista de pratos é exibida
  mostrarFormularioDefinirPrato: boolean = false; // Controla se o formulário de definir prato é exibido

  // Exibe o formulário de criação e fecha os outros
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormulario) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormularioRemover = false; // Fecha o formulário 
    }
  }

  // Exibe a lista de pratos e fecha os outros
  toggleFormularioRemover(): void {
    this.mostrarFormularioRemover = !this.mostrarFormularioRemover; // Altera o valor do mostrarFormulario para o oposto do seu valor atual
    if (this.mostrarFormularioRemover) { // Verifica se, após a alteração, o valor de mostrarFormulario ficou true
      this.mostrarFormulario = false; // Fecha o formulário 
    }
  }
}
