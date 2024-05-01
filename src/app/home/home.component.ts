import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth/auth.service';
import { PwaService } from '../shared/services/pwa-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  userLogin: string = "";

  constructor(public pwa: PwaService, private _auth: AuthService) {
    this.userLogin = _auth.currentUser?.login ?? '';
  }

  logout(): void {
    this._auth.logout();
  }
}
