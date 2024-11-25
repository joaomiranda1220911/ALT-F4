import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Certifique-se de que HttpClientModule está aqui
import { PratoService } from '../Services/prato.service';
import { Prato } from '../Models/prato';

@Component({
  selector: 'app-prato-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // HttpClientModule é necessário para injetar o HttpClient
  templateUrl: './prato-list.component.html',
  styleUrls: ['./prato-list.component.css'],
})
export class PratoListComponent implements OnInit {
  pratos: Prato[] = [];
  errorMessage: string = '';

  constructor(private pratoService: PratoService) { }

  ngOnInit(): void {
    this.loadPratos();
  }

  loadPratos(): void {
    this.pratoService.getPratos().subscribe({
      next: (data) => {
        this.pratos = data;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os pratos.';
        console.error(err);
      },
    });
  }

  toggleEstado(prato: Prato): void {
    const novoEstado = !prato.ativo;
    this.pratoService.updateEstadoPrato(prato.idPrato!, novoEstado).subscribe({
      next: () => {
        prato.ativo = novoEstado;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar o estado do prato.';
        console.error(err);
      },
    });
  }
}
