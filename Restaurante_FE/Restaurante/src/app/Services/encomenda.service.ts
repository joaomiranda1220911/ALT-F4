import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encomenda } from '../Models/encomenda';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  apiUrl = 'http://localhost:8080/api/encomendas/'; // URL do backend

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private webApiClient: HttpClient) { }

  // US7
  // Método para encomendar (POST /encomendar)
  createEncomenda(encomenda: any): Observable<any> {
    const url = `${this.apiUrl}/encomendar`;
    return this.webApiClient.post(url, encomenda, this.httpOptions);
  }

  // US8
  // Método para obter as encomendas de um cliente específico
  getEncomendasByCliente(clienteId: number): Observable<Encomenda[]> {
    const url = `${this.apiUrl}/${clienteId}`; // Constrói a URL com o clienteId
    return this.webApiClient.get<Encomenda[]>(url);
  }
}