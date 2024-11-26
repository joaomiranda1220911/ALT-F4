import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { EncomendaService } from '../Services/encomenda.service';

@Component({
  selector: 'app-list-encomendas',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './list-encomendas.component.html',
  styleUrls: ['./list-encomendas.component.css']
})
export class ListEncomendasComponent {
  encomendas: { data: string; prato: string; valor: number }[] = [];
  mensagemErro: string | null = null;
  nifCliente: any;

  constructor(private encomendaService: EncomendaService) { }

  getEncomendas(): void {
    if (!this.nifCliente) {
      this.mensagemErro = 'Por favor, insira o NIF do cliente.';
      return;
    }

    this.encomendaService.getEncomendas(this.nifCliente).subscribe(
      (encomendas) => {
        this.encomendas = encomendas;
        this.mensagemErro = null;
      },
      (error) => {
        this.mensagemErro = 'Erro ao carregar encomendas.';
        console.error(error);
      }
    );
  }
}