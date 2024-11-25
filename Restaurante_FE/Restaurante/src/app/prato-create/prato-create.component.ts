// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PratoService } from '../Services/prato.service';

// @Component({
//   selector: 'app-prato-create',
//   templateUrl: './prato-create.component.html',
//   styleUrls: ['./prato-create.component.css'],
// })
// export class PratoCreateComponent implements OnInit {
//   pratoForm: FormGroup;
//   tiposDePrato: any[] = [];
//   ingredientes: any[] = [];
//   successMessage = '';
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private pratoService: PratoService) {
//     this.pratoForm = this.fb.group({
//       nome: ['', [Validators.required]],
//       tipoPratoId: [null, [Validators.required]],
//       ingredientesIds: [[], [Validators.required]],
//       receita: [''],
//       ativo: [true, [Validators.required]],
//     });
//   }

//   ngOnInit(): void {
//     this.pratoService.getTiposDePrato().subscribe({
//       next: (data) => (this.tiposDePrato = data),
//       error: (err) => console.error('Erro ao carregar tipos de prato:', err),
//     });

//     this.pratoService.getIngredientes().subscribe({
//       next: (data) => (this.ingredientes = data),
//       error: (err) => console.error('Erro ao carregar ingredientes:', err),
//     });
//   }

//   onSubmit(): void {
//     if (this.pratoForm.valid) {
//       this.pratoService.createPrato(this.pratoForm.value).subscribe({
//         next: () => (this.successMessage = 'Prato criado com sucesso!'),
//         error: (err) => {
//           this.errorMessage = 'Erro ao criar prato. Tente novamente.';
//           console.error(err);
//         },
//       });
//     }
//   }
// }
