import { Component, OnInit } from '@angular/core';
import {tipoDeRefeicaoService} from '../Services/tipoDeRefeicao.service';
import { EmentaService } from '../Services/ementa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ementa-consultar',
  standalone: true,
  templateUrl: './ementa-consultar.component.html',
  styleUrls: ['./ementa-consultar.component.cs'],
})

export class EmentaConsultarComponent implements OnInit {
  ementaForm: FormGroup;
  ementaDisponivel: any[] = []; //Lista pratos da emneta
  errorMessage: string = ''; //Mensagem de erro
  successMessage: string = ''; 
  tipoRefeicao: any[] = [];

 constructor(
  private fb: FormBuilder,
  private ementaService: EmentaService,
  private tipoDeRefeicaoService: tipoDeRefeicaoService,
  private route: ActivatedRoute
 ){}

  ngOnInit(): void {
    this.ementaForm.this.fb.group({
      data: ['', Validators.required],
      tipoDeRefeicaoId: [null, Validators.required]
    });
      
  }
}