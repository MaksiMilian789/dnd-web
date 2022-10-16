import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: './playe-shell.component.html',
  styleUrls: ['./playe-shell.component.scss'],
})
export class PlayerShellComponent {
  user$!: Observable<User>;

  constructor(private _auth: AuthService) {
    if (sessionStorage.getItem('auth') != null) {
      //получение информации о пользователе
      this.user$ = this._auth.httpGetUser();
    }
  }

  logout(): void {
    this._auth.logout();
  }

  private _formatFio(fio: string): string {
    let result = '';
    const parts = fio.split(' ');
    result += parts[0];
    if (parts.length > 1) {
      result += ' ' + parts[1][0] + '.';
    }
    if (parts.length > 2) {
      result += ' ' + parts[2][0] + '.';
    }
    return result;
  }
}
