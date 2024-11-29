import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prato } from '../Models/prato';
import { TipoPrato, Ingrediente } from '../Models/interfaces';

@Injectable({
    providedIn: 'root',
})
export class PratoService {
    private apiUrl = 'http://localhost:5057/api/Pratos'; // URL base para pratos
    private tiposPratoUrl = 'http://localhost:5057/api/TipoDePrato'; // Endpoint de tipos de prato
    private ingredientesUrl = 'http://localhost:5057/api/Ingredientes/active'; // Endpoint de ingredientes ativos

    constructor(private http: HttpClient) { }

    // Criar um novo prato
    createPrato(prato: Prato): Observable<Prato> {
        return this.http.post<Prato>(this.apiUrl, prato);
    }

    // Obter todos os tipos de prato
    getTiposDePrato(): Observable<TipoPrato[]> {
        return this.http.get<TipoPrato[]>(this.tiposPratoUrl);
    }

    // Obter ingredientes ativos
    getIngredientes(): Observable<Ingrediente[]> {
        return this.http.get<Ingrediente[]>(this.ingredientesUrl);
    }

    // Atualizar o estado (ativo/inativo) de um prato
    updateEstadoPrato(id: number, ativo: boolean): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/estadoPrato/${id}`, { ativo });
    }

    // Obter todos os pratos
    getPratos(): Observable<Prato[]> {
        return this.http.get<Prato[]>(this.apiUrl);
    }

    // Buscar um prato por ID
    getPratoById(id: number): Observable<Prato> {
        return this.http.get<Prato>(`${this.apiUrl}/${id}`);
    }

    // Atualizar um prato específico
    updatePrato(prato: Prato): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${prato.idPrato}`, prato);
    }

    // Excluir um prato por ID
    deletePrato(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
