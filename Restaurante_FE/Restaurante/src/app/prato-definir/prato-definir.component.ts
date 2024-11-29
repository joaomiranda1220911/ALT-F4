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
  selectedPrato: Prato | undefined;
  preco: number | undefined;
  pratos: Prato[] = []; // Lista de pratos

  // Injetando ambos os serviços no construtor
  constructor(
    private pratoService: PratoService,
    private pratoSalaService: PratoSalaService
  ) { }

  ngOnInit(): void {
    // Recuperando os pratos do serviço no início
    this.pratoService.getPratos().subscribe((pratos) => {
      this.pratos = pratos;
    });
  }

  onSubmit(): void {
    if (this.selectedPrato && this.preco !== undefined) {
      const pratoSala = {
        prato: this.selectedPrato,
        preco: this.preco
      };

      // Envia para o PratoSalaService para salvar
      this.pratoSalaService.salvarPratoSala(pratoSala).subscribe(
        response => {
          console.log('PratoSala Criado:', response);
          // Aqui você pode fazer algo após salvar com sucesso, como limpar o formulário ou mostrar uma mensagem
        },
        error => {
          console.error('Erro ao salvar PratoSala:', error);
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos!');
    }
  }
}



