import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../shared/models/client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
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
}
