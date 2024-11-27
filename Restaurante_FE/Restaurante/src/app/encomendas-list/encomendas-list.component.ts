import { Component, OnInit } from '@angular/core';
import { EncomendaService } from '../Services/encomenda.service';
import { Encomenda } from '../Models/encomenda';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-encomendas-list',
  templateUrl: './encomendas-list.component.html',
  styleUrls: ['./encomendas-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,NgIf, NgFor, CommonModule],
})
export class EncomendasListComponent implements OnInit {
  clienteId: number = 0; // Inicializa com um valor padrão
  encomendas: Encomenda[] = [];
  errorMessage: string = '';

  constructor(private encomendaService: EncomendaService) {}

  ngOnInit(): void {}

  loadEncomendas(): void {
    if (this.clienteId > 0) {  // Verifica se o clienteId é válido
      // Passa o clienteId para a URL da requisição GET
      this.encomendaService.getEncomendasByCliente(this.clienteId).subscribe({
        next: (data: Encomenda[]) => {
          this.encomendas = data;
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar as encomendas';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, insira um clienteId válido';
    }
  }
}
