import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoRefeicao } from '../Models/tipoRefeicao';

@Injectable({
    providedIn: 'root',
})


export class TipoRefeicaoService {
    private apiUrl = 'http://localhost:5057/api/refeicoes/tipos'; // URL do endpoint que retorna os tipos de refeição

    constructor(private http: HttpClient) { }

    // Método para obter todos os tipos de refeição
    getTiposRefeicao(): Observable<TipoRefeicao[]> {
        return this.http.get<TipoRefeicao[]>(this.apiUrl);
    }
}
