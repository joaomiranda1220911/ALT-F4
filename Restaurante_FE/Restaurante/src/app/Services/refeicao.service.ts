import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prato } from '../Models/prato';
import { Refeicao } from '../Models/refeicao';
import { TipoPrato } from '../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RefeicaoService {
  private baseUrl = 'http://localhost:5057/api/Refeicoes'; // Ajustar conforme o backend   
  private basUrl = 'http://localhost:5057/api/Pratos/ativos';
  private baUrl = 'http://localhost:5057/api/refeicoes';
  private bUrl = 'http://localhost:5057/api/TipoDePrato';


  constructor(private http: HttpClient) {}

  // Retorna os pratos ativos
  getPratosAtivos(): Observable<Prato[]> {
    return this.http.get<Prato[]>(`${this.basUrl}`);
  }

  // Retorna todas as refeições
  getTodasRefeicoes(): Observable<Refeicao[]> {
    return this.http.get<Refeicao[]>(`${this.baUrl}`);
  }
  
  // Cria uma nova refeição
  criarRefeicao(refeicao: Refeicao): Observable<Refeicao> {
    return this.http.post<Refeicao>(`${this.baseUrl}`, refeicao);
  }

  // Remove uma refeição
  removeRefeicao(idRefeicao: Number): Observable<Refeicao> {
    return this.http.delete<Refeicao>(`${this.baseUrl}/${idRefeicao}`);
  }

  //Retorna os tipos de prato
  getTiposDePrato(): Observable<TipoPrato[]> {
    return this.http.get<TipoPrato[]>(`${this.bUrl}`);
  }

}
