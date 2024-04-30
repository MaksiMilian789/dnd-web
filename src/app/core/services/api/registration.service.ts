import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registrationMessage: Subject<boolean> = new Subject<boolean>();

  _baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private _router: Router,
    private _snackbar: MatSnackBar,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api}/api/auth`;
  }

  registration(login: string, password: string): void {
    this.httpReg(login, password).subscribe({
      complete: () => {
        this._router.navigate(['/auth']);
        this.registrationMessage.next(true);
        this._snackbar.open('Регистрация успешна');
      },
      error: () => {
        this.registrationMessage.next(false);
        this._snackbar.open('Такой логин уже существует');
      },
    });
  }

  httpReg(login: string, password: string): Observable<void> {
    return this.http.post<void>(
      `${this._baseUrl}/registration`,
      {
        login: login,
        password: password,
      },
      {},
    );
  }
}
