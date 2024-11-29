import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PratoSalaService {
  private apiUrl = 'http://localhost:8080/api/pratos';

  constructor(private http: HttpClient) {}

  // Método para definir o preço de um prato
  definirPrecoPrato(pratoId: number, preco: number): Observable<void> {
    const url = `${this.apiUrl}/${pratoId}/preco`;
    return this.http.put<void>(url, { preco });
  }
}
