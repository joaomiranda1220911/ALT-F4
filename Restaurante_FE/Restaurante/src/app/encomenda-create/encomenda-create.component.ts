import { EncomendaService } from '../Services/encomenda.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-encomenda-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,NgIf, NgFor, CommonModule],
  templateUrl: './encomenda-create.component.html',
  styleUrls: ['./encomenda-create.component.css']
})

export class EncomendaCreateComponent implements OnInit {
  encomendaForm: FormGroup;
  nifCliente: any[] = [];
  refeicao: any[] = [];
  valor: any[] = [];
  data: string = '';
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private encomendaSrv: EncomendaService) {
    // Inicializa o formulário com validações
    this.encomendaForm = this.fb.group({
      nifCliente: [null, [Validators.required]],
      refeicao: [null, [Validators.required]],
      data: [[], [Validators.required]],
      valor: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Submissão do formulário
  onSubmit(): void {
    if (this.encomendaForm.valid) {
      this.encomendaSrv.createEncomenda(this.encomendaForm.value).subscribe({
        next: () => {
          this.successMessage = 'Encomenda criada com sucesso!';
          this.encomendaForm.reset(); // Reseta o formulário após submissão bem-sucedida
        },
        error: (err) => {
          this.errorMessage = 'Erro ao criar encomenda. Tente novamente.';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
  }
}