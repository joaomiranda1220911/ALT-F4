import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ementa } from '../Models/ementa';

@Injectable({
    providedIn: 'root'
})
export class EmentaService {

    apiUrl = 'http://localhost:5057/api/refeicoes';

    httpOptions = {
        headers: new HttpHeaders({ 'Contect-Type': 'application/json' })
    };

    constructor(private webApiClient: HttpClient) { }

    // US006 - Consultar a ementa disponível para a refeição que está sendo servida
    getEmentaDisponivel(data: string, tipoRefeicaoId: number): Observable<any> {
        // Criando o HttpParams corretamente com a data no formato ISO 8601
        const params = new HttpParams()
            .set('data', new Date(data).toISOString()) // Usa o método toISOString() para garantir formato correto
            .set('tipoRefeicaoId', tipoRefeicaoId.toString()); // Asegura que tipoRefeicaoId é passado como string

        // Exibe os parâmetros para depuração
        console.log('Chamando API com:', { data, tipoRefeicaoId });
        console.log('URL gerada:', this.apiUrl);
        console.log('Parâmetros:', params);

        // Faz a requisição GET para consultar a ementa
        return this.webApiClient.get<Ementa[]>(this.apiUrl, { params });
    }
}
