import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encomenda } from '../Models/encomenda';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  apiUrl = 'http://localhost:8080/api/encomendas/'; // URL do backend
  private refeicoesUrl = 'http://localhost:5057/api/refeicoes/'; // URL para obter todas as refeicoes

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // US7

  // Obter todas as refeicoes
  getRefeicoes(): Observable<any[]> {
    return this.http.get<any[]>(this.refeicoesUrl);
  }

  // Método para encomendar (POST /encomendar)
  createEncomenda(encomenda: any): Observable<any> {
    const url = `${this.apiUrl}/encomendar`;
    return this.http.post(url, encomenda, this.httpOptions);
  }

  // US8
  // Método para obter as encomendas de um cliente específico
  getEncomendasByCliente(clienteId: number): Observable<Encomenda[]> {
    return this.http.get<Encomenda[]>(`http://localhost:8080/api/encomendas/${clienteId}`);
  }
}