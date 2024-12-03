import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RefeicaoService } from '../Services/refeicao.service';
import { Refeicao } from '../Models/refeicao';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-refeicao-remove',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './refeicao-remove.component.html',
  styleUrls: ['./refeicao-remove.component.css']
})
export class RefeicaoRemoveComponent implements OnInit {
  refeicaoRemoveForm: FormGroup;
  refeicoes: Refeicao[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private refeicaoService: RefeicaoService) {
    this.refeicaoRemoveForm = this.fb.group({
      idRefeicao: ['', Validators.required]
    });    
  }

  ngOnInit(): void {
    // Buscar todas as refeições
    this.refeicaoService.getTodasRefeicoes().subscribe(
      (refeicoes) => {
        console.log('Refeições carregadas', refeicoes);
        this.refeicoes = refeicoes;
    },
      (error) => {
        console.error('Erro ao buscar refeições:', error);
        this.errorMessage = 'Erro ao carregar refeições.';
      }
    );
  }

  onRemove(): void {
    if (this.refeicaoRemoveForm.valid) {
      const idRefeicao = Number (this.refeicaoRemoveForm.value.idRefeicao); // Certifique-se de converter para número
  
      this.refeicaoService.removeRefeicao(idRefeicao).subscribe(
        () => {
          this.successMessage = 'Refeição removida com sucesso!';
          this.errorMessage = '';
          this.refeicaoRemoveForm.reset();
          this.refeicoes = this.refeicoes.filter((refeicao) => refeicao.idRefeicao !== idRefeicao);
        },
        (error) => {
          console.error('Erro ao remover refeição:', error);
          this.errorMessage = 'Erro ao remover a refeição. Por favor, tente novamente.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Por favor, selecione uma refeição válida.';
    }
  }
  
}