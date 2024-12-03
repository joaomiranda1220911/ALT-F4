import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { PratoService } from '../Services/prato.service';

@Component({
  selector: 'app-prato-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor],
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
      next: (data) => {
        console.log('Tipos de Prato carregados:', data);
        this.tiposDePrato = data;
      },
      error: (err) => console.error('Erro ao carregar tipos de prato:', err),
    });

    this.pratoService.getIngredientes().subscribe({
      next: (data) => {
        console.log('Ingredientes carregados:', data);  // Verifique os dados recebidos
        this.ingredientes = data;
      },
      error: (err) => console.error('Erro ao carregar ingredientes:', err),
    });
  }

  onSubmit(): void {
    // Garantir que os valores de ingredientesIds são números
    const pratoData = { 
      ...this.pratoForm.value, 
      Ativo: true,  // Definir o prato como ativo
      ingredientesIds: this.pratoForm.value.ingredientesIds.map((id: string) => +id), // Converter os ids para números
      tipoPratoId: +this.pratoForm.value.tipoPratoId // Garantir que tipoPratoId seja um número
    };
  
    console.log('Dados enviados:', pratoData);  // Verificar os dados antes de enviar
  
    if (this.pratoForm.valid) {
      this.pratoService.createPrato(pratoData).subscribe({
        next: () => {
          this.successMessage = 'Prato criado com sucesso!';
          this.pratoForm.reset();
        },
        error: (err) => {
          console.log('Erro ao criar prato:', err);
          this.errorMessage = 'Erro ao criar prato. Tente novamente.';
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
  }  
}
