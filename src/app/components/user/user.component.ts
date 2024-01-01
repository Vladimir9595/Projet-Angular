import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Client } from '../../shared/models/client';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userForm: FormGroup;
  create: boolean = false;
  hidePassword: boolean = true;
  firstname: string = '';
  lastname: string = '';
  message: string = '';

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      adress: ['', Validators.required],
      postalcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      sex: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', Validators.required],
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      const client: Client = this.userForm.value;
      this.productService.createUser(client).subscribe(
        (data) => {
          console.log('Utilisateur ajouté avec succès', data);
          this.userForm.reset();
          this.create = true;
          this.message = 'Utilisateur ajouté avec succès';
          this.firstname = data.firstname;
          this.lastname = data.lastname;
        },
        (error) => {
          console.log("Erreur lors de l'ajout de l'utilisateur", error);
          this.message = "Erreur lors de l'ajout de l'utilisateur";
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
