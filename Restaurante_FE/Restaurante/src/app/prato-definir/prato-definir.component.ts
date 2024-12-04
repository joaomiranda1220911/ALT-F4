import { Component, OnInit } from '@angular/core';
import { Prato } from '../Models/prato';
import { PratoService } from '../Services/prato.service';
import { PratoSalaService } from '../Services/prato-sala.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importar CommonModule


@Component({
  selector: 'app-prato-definir',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl:'./prato-definir.component.html',
  styleUrls: ['./prato-definir.component.css']
})
export class PratoDefinirComponent implements OnInit {
  selectedPratoId: number | undefined;  // ID do prato selecionado
  preco: number | undefined;  // Preço do prato
  pratos: Prato[] = [];  // Lista de pratos
  errorMessage: string | undefined;  // mensagem de erro
  submitMessage: string | undefined;

  // Injeção dos serviços
  constructor(
    private pratoService: PratoService,
    private pratoSalaService: PratoSalaService
  ) { }

  ngOnInit(): void {
    // Carregar todos os pratos no início
    this.pratoService.getPratos().subscribe((pratos) => {
      this.pratos = pratos;
    });
  }

  // Método para enviar o ID do prato e o preço
  onSubmit(): void {
    this.errorMessage = undefined;  // Limpar mensagem de erro antes de submeter
    this.submitMessage = undefined;
    if (this.selectedPratoId && this.preco !== undefined) {
      // Passa os dados para o PratoSalaService
      this.pratoSalaService.definirPrecoPrato(this.selectedPratoId, this.preco).subscribe(
        response => {
          console.log('Preço do prato definido com sucesso:', response);
          this.submitMessage ='Preço definido com sucesso!';
        },
        error => {
          console.error('Erro ao definir o preço do prato:', error);
          this.errorMessage ='Ocorreu um erro ao definir o preço. Tente novamente.';
        }
      );
    }
  }
}




