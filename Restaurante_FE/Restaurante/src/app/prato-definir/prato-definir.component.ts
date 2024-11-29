import { Component, OnInit } from '@angular/core';
import { Prato } from '../Models/prato';
import { PratoService } from '../Services/prato.service';
import { PratoSalaService } from '../Services/prato-sala.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prato-definir',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prato-definir.component.html',
  styleUrls: ['./prato-definir.component.css']
})
export class PratoDefinirComponent implements OnInit {
  selectedPratoId: number | undefined;  // ID do prato selecionado
  preco: number | undefined;  // Preço do prato
  pratos: Prato[] = [];  // Lista de pratos

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
    if (this.selectedPratoId && this.preco !== undefined) {
      // Passa os dados para o PratoSalaService
      this.pratoSalaService.definirPrecoPrato(this.selectedPratoId, this.preco).subscribe(
        response => {
          console.log('Preço do prato definido com sucesso:', response);
          alert('Preço definido com sucesso!');
        },
        error => {
          console.error('Erro ao definir o preço do prato:', error);
          alert('Ocorreu um erro ao definir o preço. Tente novamente.');
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos!');
      alert('Por favor, preencha todos os campos!');
    }
  }
}




