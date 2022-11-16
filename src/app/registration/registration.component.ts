import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private _registration: RegistrationService,
    private _snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  registration(): void {
    if (this.form.value.password != this.form.value.passwordRepeat) {
      this._snackbar.open('Введённые пароли не совпадают');
    } else {
      //проверка в базе по Http
      this._registration.registration(
        this.form.value.login,
        this.form.value.password,
        this.form.value.passwordRepeat
      );
    }
  }
}
