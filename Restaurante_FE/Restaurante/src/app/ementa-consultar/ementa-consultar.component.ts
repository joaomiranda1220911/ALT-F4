import { Component, OnInit } from '@angular/core';
import { EmentaService } from '../Services/ementa.service';
import { Ementa } from '../Models/ementa';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpHeaders, HttpParams } from '@angular/common/http';
// import { TipoRefeicaoService } from '../Services/tipoRefeicao.service';
// import { TipoRefeicao } from '../Models/tipoRefeicao';  // Caminho correto para o seu modelo


@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.css'],
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, CommonModule],
})

export class EmentaConsultarComponent implements OnInit {
  ementa: Ementa[] = []; // Armazena a resposta da consulta
  tipoRefeicaoId: number = 1; // Definido de acordo com a lógica abaixo
  // tipoRefeicao :  TipoRefeicao[] =[]; //Lista do tipo de refeição
  // tipoRefeicaoSelecionado: string = ''; //Nome do tipo de refeição selecionadop«
  data: string = ''; // Data atual
  errorMessage: string = '';
  consultado: boolean = false; // Controla se a consulta foi feita

  constructor(
    private ementaService: EmentaService) { }
  // private tipoRefeicaoService: TipoRefeicaoService) 


  ngOnInit(): void {
    this.data = this.formatDatetime(new Date());
    // this.tipoRefeicaoService.getTiposRefeicao().subscribe((tipos) => {
    //   this.tipoRefeicao = tipos;
    //   this.tipoRefeicaoSelecionado = this.getTipoRefeicaoSelecionado();
    // });
  }
  private formatDatetime(date: Date): string {
    return date.toISOString(); // Gera algo como "2024-11-27T12:00:00.000Z"
  }

  getEmentaDisponivel() {
    this.consultado = true;
    console.log('Consulta iniciada', this.consultado);

    const params = new HttpParams()
      .set('data', new Date(this.data).toISOString())  // Garantindo que a data seja no formato ISO
      .set('tipoRefeicaoId', this.tipoRefeicaoId.toString());  // Garantindo que o tipoRefeicaoId seja enviado corretamente


    // Definindo os cabeçalhos
    const headers = new HttpHeaders().set('Accept', 'application/json');

    // Montando a URL
    const url = `http://localhost:5057/api/refeicoes/filtrar`;
    console.log('URL gerada: ', url);  // Verifique a URL gerada aqui


    this.ementaService.getEmentaDisponivel(this.data, this.tipoRefeicaoId)
      .subscribe({
        next: data => {
          this.ementa = data;
          this.errorMessage = ''; // Limpa a mensagem de erro caso a consulta tenha sucesso
          console.log('Ementa carregada', this.ementa);
        },
        complete: () => console.log('Consulta de ementa concluída.')
      });
  }
  // getTipoRefeicaoSelecionado(): string{
  //   const tipo = this.tipoRefeicao.find(t=> t.id === this.tipoRefeicaoId);
  //   return tipo ? tipo.nome: 'Tipo de refeição não encontrado';
  // }
}
