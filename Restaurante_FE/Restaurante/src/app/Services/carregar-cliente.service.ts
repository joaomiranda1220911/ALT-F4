import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarregarClienteService {
  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  carregarSaldo(clienteNif: string, valor: number): Observable<void> {
    const url = `${this.apiUrl}/${clienteNif}/carregar`;
    return this.http.patch<void>(url, { valor });
  }
}
