import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a interface ou tipo para os dados de PratoSala, caso você tenha um modelo definido
export interface PratoSala {
  prato: any;  // O tipo de prato pode ser detalhado conforme o seu modelo
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class PratoSalaService {
  
  // Defina a URL da sua API (ajuste conforme o seu back-end)
  private apiUrl = 'https://sua-api.com/prato-sala';  // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  // Método para salvar um novo PratoSala
  salvarPratoSala(pratoSala: PratoSala): Observable<any> {
    return this.http.post(this.apiUrl, pratoSala);
  }

  // Método para obter todos os PratoSala
  getPratoSaloes(): Observable<PratoSala[]> {
    return this.http.get<PratoSala[]>(this.apiUrl);
  }

  // Método para buscar um PratoSala por ID
  getPratoSalaById(id: number): Observable<PratoSala> {
    return this.http.get<PratoSala>(`${this.apiUrl}/${id}`);
  }

  // Método para atualizar um PratoSala
  atualizarPratoSala(id: number, pratoSala: PratoSala): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pratoSala);
  }

  // Método para excluir um PratoSala
  excluirPratoSala(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
