import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private _router: Router) {
    if (sessionStorage.getItem('auth') != null) {
      this.isLoggedIn = true;
    }
  }

  login(login: string, password: string): boolean {
    if (this.httpAuth(login, password)) {
      sessionStorage.setItem('auth', login);
      this.isLoggedIn = true;
      this._router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

  httpAuth(login: string, password: string): boolean {
    /*return this._http.post(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return true;
  }

  httpGetUser(): Observable<User> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: User = {
      login: 'maksim',
      fio: 'Козырин Максим Евгеньевич',
      role: 1,
    };
    return of(res);
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this._router.navigate(['/auth']);
  }
}
