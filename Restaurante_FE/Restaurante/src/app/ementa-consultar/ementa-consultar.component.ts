import { Component, OnInit } from '@angular/core';
import { EmentaService } from '../Services/ementa.service';
import { Ementa } from '../Models/ementa';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.css'],
  imports: [ReactiveFormsModule, FormsModule ,NgIf, NgFor, CommonModule],
})

export class EmentaConsultarComponent implements OnInit {
  ementa: Ementa[] = []; // Armazena a resposta da consulta
  tipoRefeicaoId: number = 1; //Exemplo: ID do tipo de refeição
  data: string = '2024-11-29'; //Exemplo: data atual ou selecionada
  errorMessage: string = '';

  constructor(private ementaService: EmentaService) { }


  ngOnInit() {
    this.getEmentaDisponivel(); // Consulta inicial
  }


  //Consultar a ementa por data e tipoRefeição
  getEmentaDisponivel() {
    this.ementaService.getEmentaDisponivel(this.data, this.tipoRefeicaoId)
      .subscribe({
        next: data => this.ementa = data,
        error: (error) => {
          this.errorMessage = 'Erro a carregar a ementa.';  
          console.error('Erro a carregar a ementa', error);
        },
        complete: () => console.log('Consulta de ementa concluída.')
      });
  }
}