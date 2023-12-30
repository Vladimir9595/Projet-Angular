import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = 'Angular';
  login: string = '';
  password: string = '';

  firstname: string = '';
  lastname: string = '';
  cnx: boolean = false;
  errorMessage: string = '';
  validMessage: string = '';

  constructor(private prodService: ProductService) {}
  connexion() {
    this.prodService.loginClient(this.login, this.password).subscribe(
      (c) => {
        this.firstname = c.firstname;
        this.lastname = c.lastname;
        this.cnx = true;
        this.validMessage = 'Connexion réussie';
        this.errorMessage = '';
      },
      () => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
      }
    );
  }
}
