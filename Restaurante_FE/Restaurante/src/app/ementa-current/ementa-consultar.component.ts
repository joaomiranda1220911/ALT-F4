import { Component, OnInit } from '@angular/core';
import { Ementa } from '@angular/common/http';
import { NgIf } from @'angular/common';
import { EmentaService } from '..Service/ementa.Service';

@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.cs']
})

export class ementaConsultarComponent implements OnInit {
  ementa: any[] = []; //Lista pratos da emneta
  errorMessage: string = ''; //Mensagem de erro

  constructor(private ementaSrv: EmentaService) { } // Injeção de dependência do serviço Ementa


  ngOnInit(): void {
    this.consultarEmenta();
  }

  consultarEmenta(): void {
    this.ementaSrv.getEmentaDisponivel().subscribe(
      (response) => {
        this.ementa = response;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Erro ao obter a ementa. Tente novamente.';
      }
    );
  }
}