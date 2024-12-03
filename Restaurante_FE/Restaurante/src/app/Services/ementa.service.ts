import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ementa} from '../Models/ementa'

@Injectable({
    providedIn: 'root'
})
export class EmentaService {
    apiUrl = 'http://localhost:5057/api/refeicoes';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private webApiClient: HttpClient) { }

    // Método para consultar a ementa disponível com base na data e tipo de refeição
    getEmentaDisponivel(data: string, tipoRefeicaoId: number): Observable<any> {
        // Criando os parâmetros corretamente com a data no formato ISO 8601
        const params = new HttpParams()
            .set('data', new Date(data).toISOString())  // Converte a data para o formato ISO
            .set('tipoRefeicaoId', tipoRefeicaoId.toString());  // Converte o tipoRefeicaoId para string

        // Exibe as informações para depuração
        console.log('Chamando API com:', { data, tipoRefeicaoId });
        console.log('URL gerada:', this.apiUrl);
        console.log('Parâmetros:', params);

        // Faz a requisição GET para consultar a ementa
        return this.webApiClient.get<Ementa[]>(this.apiUrl, { params });
    }
}

