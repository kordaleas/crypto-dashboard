import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cryptocurrency } from '../../models/cryptocurrency.interface';
import { CryptoQueryParams, DEFAULT_PARAMS } from '../../models/crypto-params.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';
  private marketsEndpoint = '/coins/markets';

  constructor(private http: HttpClient) {}

  getCryptocurrencies(params: Partial<CryptoQueryParams> = {}): Observable<Cryptocurrency[]> {
    const queryParams = { ...DEFAULT_PARAMS, ...params };
    
    let httpParams = new HttpParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.append(key, value.toString());
      }
    });

    return this.http.get<Cryptocurrency[]>(`${this.baseUrl}${this.marketsEndpoint}`, {
      params: httpParams
    });
  }

}