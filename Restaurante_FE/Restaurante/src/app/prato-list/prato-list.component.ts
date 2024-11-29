import { Component, OnInit } from '@angular/core';
import { PratoService } from '../Services/prato.service';
import { Prato } from '../Models/prato';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prato-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prato-list.component.html',
  styleUrls: ['./prato-list.component.css'],
})
export class PratoListComponent implements OnInit {
  pratoId: number = 0; // Armazena o ID inserido pelo utilizador
  prato: Prato | null = null; // Armazena o prato carregado
  tiposPrato: { id: number, nome: string }[] = []; // Propriedade para armazenar os tipos de prato
  errorMessage: string = '';

  constructor(private pratoService: PratoService) { }

  ngOnInit(): void {
    // Carregar os tipos de prato quando o componente for inicializado
    this.pratoService.getTiposDePrato().subscribe({
      next: (data) => {
        this.tiposPrato = data; // Atribui os tipos de prato à propriedade tiposPrato
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os tipos de prato.';
        console.error(err);
      },
    });
  }

  // Função para obter o nome do tipo de prato com base no tipoPratoId
  getTipoPratoNome(tipoPratoId: number): string {
    // Encontra o tipo de prato pelo id
    const tipo = this.tiposPrato.find(t => t.id === tipoPratoId);
    return tipo ? tipo.nome : 'Tipo desconhecido';
  }

  // Carregar um prato específico por ID
  loadPratoById(id: number): void {
    if (!id) {
      this.errorMessage = 'Por favor, insira um ID válido.';
      return;
    }

    // Limpa as informações do prato anterior antes de procurar um novo
    this.prato = null;
    this.errorMessage = '';

    this.pratoService.getPratoById(id).subscribe({
      next: (data) => {
        this.prato = data; // Armazena o prato encontrado
      },
      error: (err) => {
        this.errorMessage = 'O prato escolhido não existe na nossa cozinha.';
        console.error(err);
      },
    });
  }

  // Ativar/Inativar prato
  toggleEstado(prato: Prato): void {
    const novoEstado = !prato.ativo; // Alterna o estado
    this.pratoService.updateEstadoPrato(prato.idPrato!, novoEstado).subscribe({
      next: () => {
        prato.ativo = novoEstado; // Atualiza o estado localmente após sucesso
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar o estado do prato.';
        console.error('Erro no updateEstadoPrato:', err); // Log do erro
      },
    });
  }

  // Função que retorna o texto baseado no estado (ativo ou inativo)
  getEstadoTexto(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
