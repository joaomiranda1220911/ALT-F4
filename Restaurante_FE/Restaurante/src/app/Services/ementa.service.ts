import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // Torna o serviço disponível
})
export class EmentaService {

    private apiUrl = 'http://localhost:8080/sala/ementa';  // URL base

    // Construtor do serviço, injeta o HttpClient para realizar requisições HTTP
    constructor(private http: HttpClient) { }

    // Ajuste o tipo de retorno para refletir os dados da ementa
    consultarEmenta(dataHora: string, id: number): Observable<any[]> {  // Usar um array de objetos como retorno
        // Cria a URL para a requisição, concatenando a URL base, a data/hora e o id da sala
        const url = `${this.apiUrl}/${dataHora}/${id}`;
        console.log('URL da requisição:', url);
        return this.http.get<any[]>(url);  // Retorna um array de objetos
    }
}