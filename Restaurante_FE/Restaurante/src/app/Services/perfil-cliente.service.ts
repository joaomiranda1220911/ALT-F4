import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {
  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  // Método para obter os dados do cliente através do NIF
  consultarClientePorNif(nif: string): Observable<any> {
    const url = `${this.apiUrl}/${nif}`;  
    return this.http.get<any>(url); 
  }
}
