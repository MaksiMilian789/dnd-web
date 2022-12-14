import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { RegistrationService } from '../registration/registration.service';
import { PwaService } from '../shared/services/pwa-service.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [],
})
export class AuthComponent {
  form: FormGroup;
  hide = true;

  checkRegistration: Subscription;

  constructor(
    public pwa: PwaService,
    private _snackbar: MatSnackBar,
    private _auth: AuthService,
    private _registration: RegistrationService
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.checkRegistration = this._registration.registrationMessage.subscribe(
      (val) => {
        if (val) this._snackbar.open('Регистрация успешна');
      }
    );
  }

  auth(): void {
    if (this.form.invalid) {
      return;
    }

    // Проверка на логин/пароль через сервис (с оповещением о неверном через snackbar)
    this._auth.login(this.form.value.login, this.form.value.password);
  }
}
