import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/models/product';
import { Client } from '../shared/models/client';
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {
  private productsUrl = environment.backendCatalogue;
  private loginUrl = environment.backendLoginClient;

  constructor(private http: HttpClient) {}

  public loginClient(username: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'username=' + username + '&password=' + password;
    return this.http.post<Client>(this.loginUrl, data, httpOptions);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  searchCatalog(searchTerm: string): Observable<any> {
    if (searchTerm && searchTerm.trim().length >= 1) {
      const url = `https://siweb-search.onrender.com/api/catalogue/${searchTerm}`;
      return this.http.get(url);
    } else {
      return of([]);
    }
  }
}
