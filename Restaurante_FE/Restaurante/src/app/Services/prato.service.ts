// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Prato } from '../Models/prato';

// @Injectable({
//   providedIn: 'root',
// })
// export class PratoService {
//   private apiUrl = 'http://localhost:5057/api/Pratos'; // URL base da API ASP.NET

//   constructor(private http: HttpClient) { }

//   createPrato(prato: Prato): Observable<any> {
//     return this.http.post(this.apiUrl, prato);
//   }

//   getTiposDePrato(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:5057/api/TipoDePrato');
//   }

//   getIngredientes(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:5057/api/Ingredientes/active');
//   }
// }
