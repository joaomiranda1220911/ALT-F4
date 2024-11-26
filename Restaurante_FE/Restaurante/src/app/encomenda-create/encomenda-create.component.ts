import { Component } from '@angular/core';
import { EncomendaService } from '../Services/encomenda.service';
import { Location, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-encomenda',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './encomenda-create.component.html',
  styleUrls: ['./encomenda-create.component.css']
})

export class CreateEncomendaComponent {

  nifCliente: string = '';
  refeicao: string = '';
  data: string = '';
  valor: string = '';

  constructor(
    private encomendaSrv:EncomendaService,
    private browserLocation:Location 
  ) { }

  createEncomenda(): void {
    let theNewEncomenda = {
      nifCliente: this.nifCliente,
      refeicao: this.refeicao,
      data: this.data,
      valor: this.valor
    }
    this.encomendaSrv.createEncomenda(theNewEncomenda).subscribe( 
      () => this.browserLocation.back()
    );
  }
}