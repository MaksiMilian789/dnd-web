import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { PwaService } from '../shared/services/pwa-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  userLogin: string = "";

  constructor(public pwa: PwaService, private _auth: AuthService) {
    if (sessionStorage.getItem('auth') != null) {
      // Получение информации о пользователе
      this.userLogin = sessionStorage.getItem('auth') as string;
    }
  }

  logout(): void {
    this._auth.logout();
  }
}
