import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarregarClienteService {
  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  carregarSaldo(selectedNif: string, valor: number): Observable<void> {
    const url = `${this.apiUrl}/${selectedNif}/carregar`;
    return this.http.patch<void>(url, { valor });
  }
}
