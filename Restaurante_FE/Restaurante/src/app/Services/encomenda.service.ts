import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encomenda } from '../Models/encomenda';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  theServerURL = 'http://localhost:8080/api/encomendas/encomendar'; // URL do backend

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private webApiClient:HttpClient) { }

  createEncomenda(encomenda:any):Observable<any>{
    return this.webApiClient.post(this.theServerURL, encomenda, this.httpOptions);
  }
}