import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registrationMessage: Subject<boolean> = new Subject<boolean>();

  _baseUrl: string = 'http://localhost:8081';

  constructor(
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _http: HttpClient
  ) {}

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
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this._http.post<void>(
      `${this._baseUrl}/registration`,
      {
        login: login,
        password: password,
      },
      {
        headers: headers,
      }
    );
  }
}
