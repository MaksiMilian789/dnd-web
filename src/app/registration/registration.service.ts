import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registrationMessage: Subject<boolean> = new Subject<boolean>();

  constructor(private _router: Router, private _snackbar: MatSnackBar) {}

  registration(login: string, password: string, passwordRepeat: string): void {
    if (this.httpReg(login, password, passwordRepeat)) {
      this._router.navigate(['/auth']);
      this.registrationMessage.next(true);
      this._snackbar.open('Регистрация успешна');
    } else {
      this.registrationMessage.next(false);
      this._snackbar.open('Такой логин уже существует');
    }
  }

  httpReg(login: string, password: string, passwordRepeat: string): boolean {
    /*return this._http.post(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return true;
  }
}
