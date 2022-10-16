import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: './playe-shell.component.html',
  styleUrls: ['./playe-shell.component.scss'],
})
export class PlayerShellComponent implements OnDestroy {
  user$!: Observable<User>;
  showShadow: boolean = false;
  shadowCheck: Subscription;

  constructor(private _auth: AuthService, private _router: Router) {
    if (sessionStorage.getItem('auth') != null) {
      //получение информации о пользователе
      this.user$ = this._auth.httpGetUser();
    }

    this.shadowCheck = this._router.events.subscribe(() => {
      if (this._router.url == '/player') {
        this.showShadow = true;
      } else {
        this.showShadow = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.shadowCheck.unsubscribe();
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