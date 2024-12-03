import { Component, OnInit } from '@angular/core';
import { EmentaService } from '../Services/ementa.service';
import { Ementa } from '../Models/ementa';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.css'],
  imports: [CommonModule, FormsModule]
})

export class EmentaConsultarComponent implements OnInit {
  ementa: Ementa[] = [];
  tipoRefeicaoId: number = 1;
  data: string = '';
  errorMessage: string = '';
  consultado: boolean = false;

  constructor(
    private ementaService: EmentaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data = this.formatDatetime(new Date());

    // Pega parâmetros da URL (caso sejam passados como parâmetros)
    this.route.queryParams.subscribe(params => {
      const tipoRefeicaoId = params['tipoRefeicaoId'] || 1; // Fallback para 1 caso o parâmetro não esteja presente
      this.tipoRefeicaoId = tipoRefeicaoId;
    });
  }

  private formatDatetime(date: Date): string {
    return date.toISOString(); // Converte a data para o formato ISO
  }

  getEmentaDisponivel() {
    this.consultado = true;  // Inicia o processo de consulta
    console.log('Consulta iniciada', this.consultado);

    const params = new HttpParams()
      .set('data', new Date(this.data).toISOString())  // Garantindo que a data esteja no formato correto
      .set('tipoRefeicaoId', this.tipoRefeicaoId.toString());  // Garantindo que o tipoRefeicaoId seja passado corretamente

    const headers = new HttpHeaders().set('Accept', 'application/json');

    // Fazendo a consulta à API
    this.ementaService.getEmentaDisponivel(this.data, this.tipoRefeicaoId).subscribe({
      next: data => {
        // Verifica se a resposta tem dados
        if (data && data.length > 0) {
          this.ementa = data;  // Armazena os dados da resposta
          this.errorMessage = '';  // Limpa qualquer mensagem de erro
        } else {
          this.ementa = [];  // Se não houver dados, limpa a ementa
          this.errorMessage = 'Nenhuma ementa encontrada para os critérios selecionados.';
        }
      },
      error: err => {
        // Se ocorrer um erro na requisição, exibe a mensagem de erro
        console.error('Erro na requisição:', err);
        this.ementa = [];  // Limpa qualquer dado da ementa em caso de erro
      },
      complete: () => console.log('Consulta de ementa concluída.')
    });
  }
}
