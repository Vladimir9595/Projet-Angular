import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/models/product';
import { Client } from '../shared/models/client';
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {
  private productsUrl = environment.backendCatalogue;
  private createProductUrl = environment.backendCreateProduit;
  private createUserUrl = environment.backendCreateUser;
  private loginUrl = environment.backendLoginClient;

  constructor(private http: HttpClient) {}

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(this.loginUrl, data, httpOptions);
  }

  public createProduct(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('imgurl', product.imgurl);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);

    return this.http.post<Product>(this.createProductUrl, formData);
  }

  public createUser(client: Client): Observable<Client> {
    const formData = new FormData();
    formData.append('lastname', client.lastname);
    formData.append('firstname', client.firstname);
    formData.append('adress', client.adress);
    formData.append('postalcode', client.postalcode.toString());
    formData.append('city', client.city);
    formData.append('email', client.email);
    formData.append('sex', client.sex);
    formData.append('login', client.login);
    formData.append('password', client.password);
    formData.append('phonenumber', client.phonenumber.toString());

    return this.http.post<Client>(this.createUserUrl, formData);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  searchCatalog(searchTerm: string): Observable<any> {
    if (searchTerm && searchTerm.trim().length >= 1) {
      const url = `https://projet-sacchetto-vladimir.onrender.com/api/catalogue/${searchTerm}`;
      return this.http.get(url);
    } else {
      return of([]);
    }
  }
}
