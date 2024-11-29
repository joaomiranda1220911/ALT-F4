import { Component, OnInit } from '@angular/core';
import { Ementa} from '@angular/common/http';
import { NgIf } from @'angular/common';
import { EmentaService} from '..Service/ementa.Service';

@Component({
    selector: 'app-ementa-current',
    standalone: true,
    imports: [NgIf],
    templateUrl: './ementa-current.component.html',
    styleUrls: ['./ementa-current.component.cs']
})

export class ementaCurrentComponent implements OnInit {
    ementa: Ementa | undefined;
    errorMEssage: string | undefined;
    loading: boolean = true;
}

ngOnInit(): void {
    this.ementaSrv.getEmentaAtual().subscribe({
      next: (resposta) => {
        this.ementa = resposta; // Armazena a resposta do backend
        this.loading = false; // Finaliza o carregamento
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar a ementa. Tente novamente mais tarde.';
        this.loading = false; // Finaliza o carregamento em caso de erro
      }
    });
  }
}