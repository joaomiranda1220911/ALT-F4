import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prato } from '../Models/prato';

@Injectable({
    providedIn: 'root',
})
export class PratoService {
    private apiUrl = 'http://localhost:5057/api/Pratos'; // URL base da API ASP.NET
    private tiposPratoUrl = 'http://localhost:5057/api/TipoDePrato'; // Endpoint de tipos de prato
    private ingredientesUrl = 'http://localhost:5057/api/Ingredientes/active'; // Endpoint de ingredientes ativos

    constructor(private http: HttpClient) { }

    // Criar um novo prato
    createPrato(prato: Prato): Observable<any> {
        return this.http.post(this.apiUrl, prato);
    }

    // Obter todos os tipos de prato
    getTiposDePrato(): Observable<any[]> {
        return this.http.get<any[]>(this.tiposPratoUrl);
    }

    // Obter ingredientes ativos
    getIngredientes(): Observable<any[]> {
        return this.http.get<any[]>(this.ingredientesUrl);
    }

    // Atualizar o estado (ativo/inativo) de um prato
    updateEstadoPrato(id: number, estado: boolean): Observable<any> {
        return this.http.put(`${this.apiUrl}/estadoPrato/${id}`, { estado });
    }

    // Obter todos os pratos
    getPratos(): Observable<Prato[]> {
        return this.http.get<Prato[]>(this.apiUrl);
    }

    // Buscar um prato por ID
    getPratoById(id: number): Observable<Prato> {
        return this.http.get<Prato>(`${this.apiUrl}/${id}`);
    }

    // Atualizar um prato específico (caso necessário)
    updatePrato(prato: Prato): Observable<any> {
        return this.http.put(`${this.apiUrl}/${prato.idPrato}`, prato);
    }

    // Excluir um prato por ID
    deletePrato(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
