import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ClientService } from '../../services/client.service';
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

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      lastname: [
        '',
        [Validators.required, this.noNumbersOrSpecialCharsValidator],
      ],
      firstname: [
        '',
        [Validators.required, this.noNumbersOrSpecialCharsValidator],
      ],
      adress: [
        '',
        [Validators.required, this.allowedCharactersValidatorAddress],
      ],
      postalcode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      city: ['', [Validators.required, this.noNumbersOrSpecialCharsValidator]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      login: ['', [Validators.required, this.allowedCharactersValidatorLogin]],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, this.onlyNumbers]],
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      const client: Client = this.userForm.value;
      this.clientService.createUser(client).subscribe(
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
    } else {
      this.message = 'Veuillez remplir tous les champs correctement.';
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  noNumbersOrSpecialCharsValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const hasNumbersOrSpecialChars = /[0-9~#{}\[\]()`"'&$£%*.,;:\\/]/.test(
      control.value
    );
    return hasNumbersOrSpecialChars ? { noNumbersOrSpecialChars: true } : null;
  }

  allowedCharactersValidatorLogin(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const allowedCharactersLogin = /^[a-zA-Z0-9_]*$/.test(control.value);
    return allowedCharactersLogin ? null : { invalidCharactersLogin: true };
  }

  allowedCharactersValidatorAddress(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const allowedCharactersAddress =
      /^[a-zA-Z0-9,âêîôûäëïöüàæçéèœùÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ\s]*$/.test(control.value);
    return allowedCharactersAddress ? null : { invalidCharactersAddress: true };
  }

  onlyNumbers(control: AbstractControl): { [key: string]: any } | null {
    const onlyNumbers = /^[0-9]*$/.test(control.value);
    return onlyNumbers ? null : { invalidCharactersPhone: true };
  }

  get firstnameControl() {
    return this.userForm.get('firstname');
  }

  get lastnameControl() {
    return this.userForm.get('lastname');
  }

  get addressControl() {
    return this.userForm.get('adress');
  }

  get cityControl() {
    return this.userForm.get('city');
  }

  get postalcodeControl() {
    return this.userForm.get('postalcode');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get loginControl() {
    return this.userForm.get('login');
  }

  get phonenumberControl() {
    return this.userForm.get('phonenumber');
  }
}
