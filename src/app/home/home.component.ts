import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models/user';
import { pwaService } from '../shared/services/pwa-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  user$!: Observable<User>;

  constructor(public pwa: pwaService, private _auth: AuthService) {
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
