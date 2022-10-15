import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [],
})
export class AuthComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _auth: AuthService
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  registration(): void {}

  auth(): void {
    if (this.form.invalid) {
      return;
    }


    //проверка на логин/пароль через сервис (с оповещением о неверном через snackbar)
    this._auth.login(this.form.value.login, this.form.value.password);
    

    /*const formState: { login: string; password: string } = this.form.value;
    this.form.disable();
    this.authService
      .auth(formState.login, formState.password)
      .pipe(finalize(() => this.form.enable()))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status == 401) {
            this.snackbar.open('Неверный логин или пароль.');
          } else {
            throw error;
          }
        },
      });*/
  }
}
