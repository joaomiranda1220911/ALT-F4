import { Component, OnInit } from '@angular/core';
import { EmentaService } from '../Services/ementa.service';


@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.cs'],
})

export class EmentaConsultarComponent implements OnInit {
  ementa: any;
  tipoRefeicaoId: number = 1; //Exemplo: ID do tipo de refeição
  data: string = '2024-11-29'; //Exemplo: data atual ou selecionada

  constructor(private ementaService: EmentaService) { }


  ngOnInit() {
    this.getEmentaDisponivel();
  }

  getEmentaDisponivel() {
    this.ementaService.getEmentaDisponivel(this.data, this.tipoRefeicaoId)
      .subscribe({
        next: data => this.ementa = data,
        error: error => console.error('Erro a carregar a ementa', error),
        complete: () => console.log('Consulta de ementa concluída.')
      });
  }
}