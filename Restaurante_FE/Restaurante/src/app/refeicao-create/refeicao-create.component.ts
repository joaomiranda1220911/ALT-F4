import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { subscribe } from 'diagnostics_channel';
import { RefeicaoService } from '../Services/refeicao.service';
import { Refeicao } from '../Models/refeicao';

@Component({
  selector: 'app-refeicao-create',
  standalone:true,
  imports:[ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './refeicao-create.component.html',
  styleUrls: ['./refeicao-create.component.css']
})
export class RefeicaoCreateComponent{
  refeicaoCreateForm: FormGroup;
  pratosAtivos: any[] = []; // Array de pratos ativos, substitua pelo modelo real
  tiposDePrato: any [] = [];
  successMessage = '';
  errorMessage = '';


  constructor(private fb: FormBuilder, private refeicaoService: RefeicaoService) {
    this.refeicaoCreateForm = this.fb.group({
      Data: ['', Validators.required],
      Hora: ['', Validators.required],
      IdPrato: ['', Validators.required],
      QuantidadeProduzida: ['', [Validators.required, Validators.min(1)]],
      TipoRefeicaoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Buscar pratos ativos ao iniciar
    this.refeicaoService.getPratosAtivos().subscribe(
      (pratos) => this.pratosAtivos = pratos,
      (error) => console.error('Erro ao buscar pratos ativos:', error)
    );

    this.refeicaoService.getTiposDePrato().subscribe(
      (tipos) => this.tiposDePrato = tipos,
      (error) => console.error('Erro ao buscar tipos de prato:', error)
    );

    
  }

  onSubmit(): void {
    if (this.refeicaoCreateForm.valid) {
        const dataHora = this.refeicaoCreateForm.value.Data + 'T' + this.refeicaoCreateForm.value.Hora;
        const refeicao = {
            Data: dataHora,
            IdPrato: this.refeicaoCreateForm.value.IdPrato,
            QuantidadeProduzida: this.refeicaoCreateForm.value.QuantidadeProduzida,
            TipoRefeicaoId: this.refeicaoCreateForm.value.TipoRefeicaoId
        };

        console.log('Objeto enviado ao backend:', refeicao);

        this.refeicaoService.criarRefeicao(refeicao).subscribe(
            (response) => {
                this.successMessage = 'Refeição criada com sucesso!';
                this.errorMessage = '';
                this.refeicaoCreateForm.reset();
            },
            (error) => {
                console.error('Erro ao criar refeição:', error);
                this.errorMessage = 'Erro ao criar refeição. Tente novamente.';
                this.successMessage = '';
            }
        );
    } else {
        this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
}
