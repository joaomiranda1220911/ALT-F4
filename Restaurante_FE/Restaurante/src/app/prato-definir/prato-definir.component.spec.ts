import { Component } from '@angular/core';
import { PratoSalaService } from '../Services/prato-sala.service';
import { HttpErrorResponse } from '@angular/common/http';  // Importar HttpErrorResponse


@Component({
  selector: 'app-prato-sala',
  templateUrl: './prato-sala.component.html',
  styleUrls: ['./prato-sala.component.css'],
})
export class PratoSalaComponent {
  pratoId!: number; // ID do prato inserido pelo utilizador
  preco!: number;   // Preço inserido pelo utilizador

  constructor(private pratoSalaService: PratoSalaService) {}

  onSubmit() {
    if (this.pratoId && this.preco) {
      this.pratoSalaService.definirPrecoPrato(this.pratoId, this.preco).subscribe({
        next: () => {
          alert('Preço definido com sucesso!');
        },
        error: (error: any) => { // Adiciona explicitamente o tipo
          console.error('Erro ao definir preço:', error); // Mostra o erro no console para depuração
          alert('Ocorreu um erro ao definir o preço. Por favor, tente novamente.');
        },
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
  
