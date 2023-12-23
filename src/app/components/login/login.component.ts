import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = 'Angular';
  username: string = '';
  password: string = '';

  firstName: string = '';
  lastName: string = '';
  cnx: boolean = false;
  errorMessage: string = '';
  validMessage: string = '';

  constructor(private prodService: ProductService) {}
  connexion() {
    this.prodService.loginClient(this.username, this.password).subscribe(
      (c) => {
        this.firstName = c.firstName;
        this.lastName = c.lastName;
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
