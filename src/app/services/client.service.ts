import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Client } from '../shared/models/client';
import { environment } from '../environments/environment';
import { Store } from '@ngxs/store';
import { ClearCart } from '../shared/actions/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private createUserUrl = environment.backendCreateUser;
  private loginUrl = environment.backendLoginClient;
  private cnx: boolean = false;

  private cnxSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private store: Store) {}

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

  public logoutClient(): Observable<any> {
    this.cnx = false;
    this.cnxSubject.next(false);
    this.store.dispatch(new ClearCart());
    return of({});
  }

  public setClientLoggedIn(): void {
    this.cnx = true;
    this.cnxSubject.next(true);
  }

  public setClientLoggedOut(): void {
    this.cnx = false;
    this.cnxSubject.next(false);
  }

  public isClientLoggedIn(): boolean {
    return this.cnx;
  }

  public getCnxObservable(): Observable<boolean> {
    return this.cnxSubject.asObservable();
  }
}
