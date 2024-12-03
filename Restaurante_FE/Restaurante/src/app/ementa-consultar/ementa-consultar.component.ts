
import { Component } from '@angular/core';
import { EmentaService } from '../Services/ementa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.css']
})
export class ConsultarEmentaComponent {
  data: string = ''; // Data selecionada pelo usuário
  hora: string = ''; // Hora selecionada pelo usuário
  id: number | null = null; // ID da sala
  ementa: any[] | null = null; // Dados da ementa retornados do backend
  erro: boolean = false; // Indicador de erro ao buscar dados
  loading: boolean = false; // Indicador de carregamento


  constructor(private ementaService: EmentaService) { }

  consultarEmenta(): void {
    // Validação básica
    if (!this.data || !this.hora || this.id === null) {
      this.erro = true;
      this.ementa = null;
      return;
    }
    // Formata a data e a hora para o formato ISO 
    const dataHora = new Date(`${this.data}T${this.hora}:00`).toISOString();
    // Define o estado inicial antes da requisição
    this.loading = true;
    this.erro = false; // Reinicia o erro antes de iniciar a chamada
    this.ementa = null; // Limpa ementa antes de carregar

    // Chamada ao serviço
    this.ementaService.consultarEmenta(dataHora, this.id).subscribe({
      next: (data: any[]) => {
        console.log('Resposta recebida do backend:', JSON.stringify(data, null, 2));
        if (data && data.length > 0) {
          // Filtra para o ID desejado
          this.ementa = data.filter(item => item._id === this.id);
          this.erro = this.ementa.length === 0; // Mostra erro se nenhum dado corresponder
        } else {
          this.erro = true;
          this.ementa = null;
        }
        this.loading = false; // Estado de carregamento finalizado
      },
      error: (err) => {
        console.error('Erro ao consultar a ementa:', err);
        this.erro = true;
        this.ementa = null;
        this.loading = false; // Estado de carregamento finalizado
      }
    });
  }
}