import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    provideIn: 'root'
})
export class EmentaService {

    apiUrl = 'http://localhost:8080/api/ementas';

    httpOptions = {
        headers: new HttpHeaders({ 'Contect-Type': 'application/json' })
    };
    constructor(private webApiClient: HttpClient) { }

    // US006 - Consultar a ementa disponível para a refeição que está sendo servida
    getEmentaDisponivel(data: string, tipoRefeicaoId: number): Observable<any> {
        // Constroi a URL para consultar a ementa atual
        const url = `${this.apiUrl}/consultarAtual`;

        //Faz a requição Http Get para obter a ementa
        return this.webApiClient.get<any>(url, this.httpOptions);

    }
}
