import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { PratoService } from '../Services/prato.service';

@Component({
  selector: 'app-prato-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,NgIf, NgFor],
  templateUrl: './prato-create.component.html',
  styleUrls: ['./prato-create.component.css'],
})
export class PratoCreateComponent implements OnInit {
  pratoForm: FormGroup;
  tiposDePrato: any[] = [];
  ingredientes: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private pratoService: PratoService) {
    // Inicializa o formulário com validações
    this.pratoForm = this.fb.group({
      nome: ['', [Validators.required]],
      tipoPratoId: [null, [Validators.required]],
      ingredientesIds: [[], [Validators.required]],
      receita: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Carregar os tipos de prato
    this.pratoService.getTiposDePrato().subscribe({
      next: (data) => (this.tiposDePrato = data),
      error: (err) => console.error('Erro ao carregar tipos de prato:', err),
    });

    // Carregar os ingredientes
    this.pratoService.getIngredientes().subscribe({
      next: (data) => (this.ingredientes = data),
      error: (err) => console.error('Erro ao carregar ingredientes:', err),
    });
  }

  // Submissão do formulário
  onSubmit(): void {
    if (this.pratoForm.valid) {
      this.pratoService.createPrato(this.pratoForm.value).subscribe({
        next: () => {
          this.successMessage = 'Prato criado com sucesso!';
          this.pratoForm.reset(); // Reseta o formulário após submissão bem-sucedida
        },
        error: (err) => {
          this.errorMessage = 'Erro ao criar prato. Tente novamente.';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
  }
}
