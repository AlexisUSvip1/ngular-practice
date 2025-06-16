// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';
const API_KEY = environment.apiKey;
const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root', // ✅ Esto es lo que registra el servicio automáticamente
})
export class FetchApiMovies {
  constructor(private http: HttpClient) {}
 
  getMoviesApi(endpoint: string, pagination?: number, query?: string): Observable<any> {
    let url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${pagination}`;
    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }
    return this.http.get<any>(url);
  }
  getMoviesIdi(endpoint: string, language: string = 'es-MX'): Observable<any> {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}`;
    return this.http.get<any>(url);
  }
}