import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RefeicaoService } from '../Services/refeicao.service';
import { Refeicao } from '../Models/refeicao';

@Component({
  selector: 'app-refeicao-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './refeicao-create.component.html',
  styleUrls: ['./refeicao-create.component.css']
})
export class RefeicaoCreateComponent implements OnInit {
  refeicaoCreateForm: FormGroup;
  pratosAtivos: any[] = [];
  tipoRefeicao: any[] = [];
  tiposDePrato: any[] = [];
  successMessage?: string; 
  errorMessage?: string;  

  constructor(private fb: FormBuilder, private refeicaoService: RefeicaoService) {
    this.refeicaoCreateForm = this.fb.group({
      Data: ['', Validators.required],
      IdPrato: ['', Validators.required],
      QuantidadeProduzida: ['', [Validators.required, Validators.min(1)]],
      TipoRefeicaoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Buscar pratos ativos ao iniciar
    this.refeicaoService.getPratosAtivos().subscribe({
      next: (pratos) => (this.pratosAtivos = pratos),
      error: (err) => console.error('Erro ao buscar pratos ativos:', err)
    });

    this.refeicaoService.getTipoRefeicao().subscribe({
      next: (tipo) => (this.tipoRefeicao = tipo),
      error: (err) => console.error('Erro ao buscar tipos de refeição:', err)
    });
  }

  onSubmit(): void {
    if (this.refeicaoCreateForm.valid) {
      
      const refeicao = {
        Data: new Date((this.refeicaoCreateForm.get('Data')?.value)),
        IdPrato: +this.refeicaoCreateForm.get('IdPrato')?.value,
        QuantidadeProduzida: +this.refeicaoCreateForm.get('QuantidadeProduzida')?.value,
        TipoRefeicaoId: +this.refeicaoCreateForm.get('TipoRefeicaoId')?.value
      };
  
      console.log('Payload enviado ao backend:', refeicao);
  
      this.refeicaoService.criarRefeicao(refeicao).subscribe({
        next: () => {
          this.successMessage = 'Refeição criada com sucesso!';
          this.errorMessage = '';
          this.refeicaoCreateForm.reset();
        },
        error: (err) => {
          console.error('Erro ao criar refeição:', err);
          this.errorMessage = err.error?.message || 'Erro ao criar refeição. Tente novamente.';
        }
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
  
}
